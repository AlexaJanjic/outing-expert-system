import model.MusicType;
import model.Recommendation;
import model.User;
import model.Venue;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;

import org.kie.internal.utils.KieHelper;

import java.util.List;

public class Main {

    public static void main(String[] args) {

        KieHelper kieHelper = new KieHelper();

        kieHelper.addResource(
                org.kie.internal.io.ResourceFactory
                        .newClassPathResource("rules/recommendation.drl"),
                ResourceType.DRL
        );

        KieSession kieSession = kieHelper.build().newKieSession();

        User user = new User(
                "Aleksa",
                List.of(MusicType.JAZZ),
                5000,
                false
        );

        Venue venue1 = new Venue(
                "Jazz Life",
                List.of(MusicType.JAZZ, MusicType.FOLK),
                2000,
                false
        );

        Venue venue2 = new Venue(
                "Insomnia",
                List.of(MusicType.JAZZ, MusicType.ROCK),
                4900,
                true
        );

        kieSession.insert(user);
        kieSession.insert(venue1);
        kieSession.insert(venue2);

        kieSession.fireAllRules();

        List<Recommendation> recommendations = kieSession
                .getObjects(obj -> obj instanceof Recommendation)
                .stream()
                .map(obj -> (Recommendation) obj)
                .filter(r -> r.getFinalScore() > 0)
                .sorted((r1, r2) ->
                        Integer.compare(
                                r2.getFinalScore(),
                                r1.getFinalScore()
                        )
                )
                .toList();

        System.out.println("\n=== FINAL RECOMMENDATIONS ===\n");

        for (int i = 0; i < recommendations.size(); i++) {

            Recommendation r = recommendations.get(i);

            System.out.println(
                    (i + 1) + ". "
                            + r.getVenueName()
                            + " | Score: "
                            + r.getFinalScore()
            );
        }

        kieSession.dispose();
    }
}
