package app.model.recommendation;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Recommendation {
    private Long id;
    private String venueName;
    private int finalScore;
}
