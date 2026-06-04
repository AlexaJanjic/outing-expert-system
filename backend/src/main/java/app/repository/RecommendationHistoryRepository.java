package app.repository;

import app.model.recommendation.RecommendationHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendationHistoryRepository extends JpaRepository<RecommendationHistory, Long> {
}
