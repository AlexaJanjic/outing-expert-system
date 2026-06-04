package app.repository;

import app.model.user.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferencesRepository  extends JpaRepository<UserPreferences, Long> {

}
