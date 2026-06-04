package app.model.recommendation;

import app.model.enums.MatchType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    private Venue venue;
    private MatchType matchType;
    private int score;
}
