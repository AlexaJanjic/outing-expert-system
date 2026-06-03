//import app.app.model.enums.EventType;
//import app.app.model.enums.MusicType;
//import app.app.model.recommendation.Recommendation;
//import app.app.model.recommendation.Venue;
//import app.app.model.user.User;
//import org.drools.template.ObjectDataCompiler;
//import org.kie.api.io.ResourceType;
//import org.kie.api.runtime.KieSession;
//import org.kie.internal.io.ResourceFactory;
//import org.kie.internal.utils.KieHelper;
//
//import java.io.InputStream;
//import java.util.ArrayList;
//import java.util.Comparator;
//import java.util.List;
//import java.util.Map;
//
//public class starimain {
//
//    public static void main(String[] args) throws Exception {
//
//        KieHelper kieHelper = new KieHelper();
//
//        kieHelper.addResource(
//                ResourceFactory.newClassPathResource(
//                        "rules/recommendation.drl"
//                ),
//                ResourceType.DRL
//        );
//
//        String musicDRL = generateMusicRules();
//
//        kieHelper.addContent(
//                musicDRL,
//                ResourceType.DRL
//        );
//
//        String eventDRL = generateEventRules();
//
//        kieHelper.addContent(
//                eventDRL,
//                ResourceType.DRL
//        );
//
//        KieSession kieSession =
//                kieHelper.build().newKieSession();
//
//        User user = new User(
//                "Aleksa",
//                List.of(
//                        MusicType.JAZZ,
//                        MusicType.ROCK
//                ),
//                List.of(
//                        EventType.DJ,
//                        EventType.LIVE_BAND
//                ),
//                5000,
//                false,
//                5
//        );
//
//        Venue venue1 = new Venue(
//                "Jazz Life",
//                List.of(
//                        MusicType.JAZZ,
//                        MusicType.FOLK
//                ),
//                List.of(
//                        EventType.LIVE_BAND
//                ),
//                2000,
//                false,
//                100
//        );
//
//        Venue venue2 = new Venue(
//                "Insomnia",
//                List.of(
//                        MusicType.JAZZ,
//                        MusicType.ROCK
//                ),
//                List.of(
//                        EventType.DJ
//                ),
//                4900,
//                true,
//                100
//        );
//
//        Venue venue3 = new Venue(
//                "Rock Arena",
//                List.of(
//                        MusicType.ROCK
//                ),
//                List.of(
//                        EventType.KARAOKE
//                ),
//                3500,
//                false,
//                100
//        );
//
//        kieSession.insert(user);
//
//        kieSession.insert(venue1);
//        kieSession.insert(venue2);
//        kieSession.insert(venue3);
//
//        kieSession.fireAllRules();
//
//        List<Recommendation> recommendations =
//                kieSession.getObjects(
//                                o -> o instanceof Recommendation
//                        )
//                        .stream()
//                        .map(o -> (Recommendation) o)
//                        .sorted(
//                                Comparator.comparingInt(
//                                                Recommendation::getFinalScore
//                                        )
//                                        .reversed()
//                        )
//                        .toList();
//
//        System.out.println(
//                "\n=== FINAL RECOMMENDATIONS ===\n"
//        );
//
//        recommendations.forEach(r ->
//                System.out.println(
//                        r.getVenueName()
//                                + " | Score: "
//                                + r.getFinalScore()
//                )
//        );
//
//        kieSession.dispose();
//    }
//
//    private static String generateMusicRules() throws Exception {
//
//        InputStream templateStream =
//                ResourceFactory
//                        .newClassPathResource(
//                                "rules/music-template.drt"
//                        )
//                        .getInputStream();
//
//        List<Map<String, Object>> rows = new ArrayList<>();
//
//        rows.add(Map.of("musicType", "JAZZ", "score", 10));
//        rows.add(Map.of("musicType", "ROCK", "score", 10));
//        rows.add(Map.of("musicType", "TECHNO", "score", 10));
//        rows.add(Map.of("musicType", "POP", "score", 10));
//        rows.add(Map.of("musicType", "FOLK", "score", 10));
//
//        ObjectDataCompiler compiler =
//                new ObjectDataCompiler();
//
//        return compiler.compile(rows, templateStream);
//    }
//
//    private static String generateEventRules() throws Exception {
//
//        InputStream templateStream =
//                ResourceFactory
//                        .newClassPathResource(
//                                "rules/event-template.drt"
//                        )
//                        .getInputStream();
//
//        List<Map<String, Object>> rows = new ArrayList<>();
//
//        rows.add(Map.of("eventType", "DJ", "score", 8));
//        rows.add(Map.of("eventType", "LIVE_BAND", "score", 8));
//        rows.add(Map.of("eventType", "ACOUSTIC", "score", 8));
//        rows.add(Map.of("eventType", "KARAOKE", "score", 8));
//
//        ObjectDataCompiler compiler =
//                new ObjectDataCompiler();
//
//        return compiler.compile(rows, templateStream);
//    }
//}