package app.model.backward;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.kie.api.definition.type.Position;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GoalRule {
    @Position(0)
    private Goal parentGoal;
    @Position(1)
    private Goal childGoal;
}
