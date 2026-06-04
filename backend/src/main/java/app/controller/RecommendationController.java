package app.controller;

import app.dto.RecommendationHistoryDto;
import app.dto.RecommendationSessionDto;
import app.model.recommendation.Recommendation;
import app.model.recommendation.RecommendationSession;
import app.model.user.User;
import app.model.user.UserPreferences;
import app.repository.RecommendationHistoryRepository;
import app.repository.RecommendationSessionRepository;
import app.repository.UserRepository;
import app.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {
    private final RecommendationService recommendationService;
    private final UserRepository userRepository;
    private final RecommendationSessionRepository recommendationSessionRepository;

    @PostMapping("/generate")
    public Object generate(@RequestBody UserPreferences userPreferences, Authentication authentication) throws Exception {

        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow();
        user.setPreferences(userPreferences);

        userRepository.save(user);

        List<Recommendation> recommendations = recommendationService.generate(userPreferences);

        RecommendationSession session = new RecommendationSession();
        session.setUser(user);
        session.setCreatedAt(LocalDateTime.now());
        session = recommendationSessionRepository.save(session);
        recommendationService.saveHistory(session, recommendations);

        return recommendations;
    }

    @GetMapping("/preferences/me")
    public UserPreferences getMyPreferences(Authentication authentication){

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        return user.getPreferences();
    }

    @GetMapping("/last")
    public RecommendationSessionDto getLastSession(Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        RecommendationSession session =  recommendationSessionRepository
                .findTop5ByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .findFirst()
                .orElse(null);

        if (session == null){return null;}

        return new RecommendationSessionDto(
                session.getId(),
                session.getCreatedAt(),
                session.getRecommendations()
                        .stream()
                        .map(r ->
                                new RecommendationHistoryDto(
                                        r.getId(),
                                        r.getVenueName(),
                                        r.getScore(),
                                        r.getVenueId()
                                )
                        )
                        .toList()
        );
    }
}