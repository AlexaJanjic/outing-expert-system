package app.service;

import app.model.recommendation.Recommendation;
import app.model.recommendation.RecommendationHistory;
import app.model.recommendation.RecommendationSession;
import app.model.user.UserPreferences;
import app.repository.RecommendationHistoryRepository;
import app.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.drools.template.ObjectDataCompiler;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.utils.KieHelper;
import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RecommendationService {
    private final VenueRepository venueRepository;
    private final RecommendationHistoryRepository recommendationHistoryRepository;

    public List<Recommendation> generate(UserPreferences preferences) throws Exception {
        KieHelper kieHelper = new KieHelper();

        kieHelper.addResource(ResourceFactory.newClassPathResource("rules/recommendation.drl"), ResourceType.DRL);

        kieHelper.addContent(generateMusicRules(), ResourceType.DRL);

        kieHelper.addContent(generateEventRules(), ResourceType.DRL);

        KieSession kieSession = kieHelper.build().newKieSession();

        kieSession.insert(preferences);

        venueRepository.findAll().forEach(kieSession::insert);

        int fired = kieSession.fireAllRules();

        List<Recommendation> recommendations =
                kieSession.getObjects(o -> o instanceof Recommendation)
                        .stream()
                        .map(o -> (Recommendation) o)
                        .sorted(Comparator.comparingInt(Recommendation::getFinalScore).reversed())
                        .toList();

        kieSession.dispose();

        return recommendations;
    }

    private String generateMusicRules() throws Exception{
        InputStream templateStream = ResourceFactory.newClassPathResource("rules/music-template.drt").getInputStream();
        InputStream csvStream = ResourceFactory.newClassPathResource("rules/music-data.csv").getInputStream();

        List<Map<String, Object>> rows = new ArrayList<>();

        try(BufferedReader reader = new BufferedReader(new InputStreamReader(csvStream))){
            reader.readLine();

            String line;

            while((line = reader.readLine()) != null){
                String[] values = line.split(",");

                rows.add(Map.of("musicType", values[0].trim(), "score", Integer.parseInt(values[1].trim())));
            }
        }

        ObjectDataCompiler compiler = new ObjectDataCompiler();

        return compiler.compile(rows, templateStream);

    }

    private String generateEventRules() throws Exception{
        InputStream templateStream = ResourceFactory.newClassPathResource("rules/event-template.drt").getInputStream();
        InputStream csvStream = ResourceFactory.newClassPathResource("rules/event-data.csv").getInputStream();

        List<Map<String, Object>> rows = new ArrayList<>();

        try(BufferedReader reader = new BufferedReader(new InputStreamReader(csvStream))){
            reader.readLine();

            String line;

            while((line = reader.readLine()) != null){
                String[] values = line.split(",");

                rows.add(Map.of("eventType", values[0].trim(), "score", Integer.parseInt(values[1].trim())));
            }
        }

        ObjectDataCompiler compiler = new ObjectDataCompiler();

        return compiler.compile(rows, templateStream);

    }

    public void saveHistory(RecommendationSession session, List<Recommendation> recommendations) {
        recommendations.forEach(r -> {

            RecommendationHistory history = new RecommendationHistory();

            history.setSession(session);

            history.setVenueName(r.getVenueName());

            history.setScore(r.getFinalScore());

            recommendationHistoryRepository.save(history);
        });
    }
}