package app.model.recommendation;

import app.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecommendationSession {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private User user;
    private LocalDateTime createdAt;
    @OneToMany(mappedBy = "session")
    private List<RecommendationHistory> recommendations;
}