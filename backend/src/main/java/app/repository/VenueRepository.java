package app.repository;

import app.model.recommendation.Venue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VenueRepository  extends JpaRepository<Venue, Long> {
}
