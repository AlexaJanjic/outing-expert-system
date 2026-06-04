package app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RecommendationHistoryDto {
    private Long id;
    private String venueName;
    private int score;
    private Long venueId;
}
