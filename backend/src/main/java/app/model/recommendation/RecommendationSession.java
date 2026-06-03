package app.model.recommendation;

import app.model.user.User;
import jakarta.persistence.*;
import lombok.*;
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