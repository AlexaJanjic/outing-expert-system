package app.repository;

import app.model.recommendation.RecommendationHistory;
import app.model.recommendation.RecommendationSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecommendationSessionRepository  extends JpaRepository<RecommendationSession, Long> {

    List<RecommendationSession> findTop5ByUserIdOrderByCreatedAtDesc(Long userId);
}
