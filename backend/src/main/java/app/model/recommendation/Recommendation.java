package app.model.recommendation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {
    private Long id;
    private String venueName;
    private int finalScore;

    @Override
    public String toString() {
        return "Recommended venue: " + venueName +
                " | Score: " + finalScore;
    }
}
