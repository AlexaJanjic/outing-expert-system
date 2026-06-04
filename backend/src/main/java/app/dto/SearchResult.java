package app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResult {
    private Long venueId;
    private String venueName;
    private int matchedGoals;
    private int totalGoals;
    private double score;
    private List<RequirementResult> requirements;
}
