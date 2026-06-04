package app.service;

import app.dto.RequirementResult;
import app.dto.SearchRequest;
import app.dto.SearchResult;
import app.model.backward.Goal;
import app.model.backward.GoalFact;
import app.model.backward.GoalRule;
import app.model.backward.SearchTree;
import app.model.recommendation.Recommendation;
import app.model.recommendation.Venue;
import app.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.rule.QueryResults;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final VenueRepository venueRepository;
    private final TreeBuilderService treeBuilderService;
    private final KieContainer kieContainer;

    public List<SearchResult> recommend(SearchRequest searchRequest){

        SearchTree tree = treeBuilderService.build(searchRequest.getGoal(), searchRequest.getAnswers());

        List<Venue> venues = venueRepository.findAll();

        List<SearchResult> results = new ArrayList<>();

        for(Venue venue: venues){
            KieSession kieSession = kieContainer.newKieSession("backwardSession");

            for(GoalRule rule: tree.getRules()){
                kieSession.insert(rule);
            }

            try{
                kieSession.insert(venue);

                kieSession.fireAllRules();

                List<GoalFact> goalFacts = kieSession.getObjects(o -> o instanceof GoalFact).stream().map(o-> (GoalFact)o).toList();

                Set<Goal> leafGoals = findLeafGoals(tree.getRules());

                Set<Goal> satisfiedGoals = goalFacts.stream().map(GoalFact::getGoal).collect(Collectors.toSet());

                Set<Goal> matchedLeafGoals = new HashSet<>();
                Set<Goal> missingGoals = new HashSet<>();

                for (Goal leafGoal : leafGoals) {

                    QueryResults queryResults = kieSession.getQueryResults("goalSatisfied", leafGoal);

                    if (queryResults.size() > 0) {
                        matchedLeafGoals.add(leafGoal);
                    } else {
                        missingGoals.add(leafGoal);
                    }
                }

                List<RequirementResult> requirements = new ArrayList<>();

                for(Map.Entry<String, Set<Goal>> entry : tree.getAnswerGoals().entrySet()) {

                    String questionId = entry.getKey();

                    Set<Goal> goalsForAnswer = entry.getValue();

                    boolean satisfied = false;

                    for(Goal goal : goalsForAnswer) {

                        if(matchedLeafGoals.contains(goal)) {
                            satisfied = true;
                            break;
                        }
                    }

                    requirements.add(new RequirementResult(questionId, satisfied));
                }

                long matched = matchedLeafGoals.size();

                double score = leafGoals.isEmpty() ? 0 : matched * 100.0 / leafGoals.size();


                SearchResult result = new SearchResult();
                result.setVenueId(venue.getId());
                result.setVenueName(venue.getName());
                result.setMatchedGoals((int) matched);
                result.setRequirements(requirements);
                result.setScore(Math.round(score));
                result.setTotalGoals(leafGoals.size());

                results.add(result);
            }finally {
                kieSession.dispose();
            }
        }
        results.sort(Comparator.comparingDouble(SearchResult::getScore).reversed());

        return results.stream()
                .filter(result -> result.getScore() > 0)
                .limit(5)
                .toList();
    }

    private Set<Goal> findLeafGoals(List<GoalRule> rules) {
        Set<Goal> parents = rules.stream()
                .map(GoalRule::getParentGoal)
                .collect(Collectors.toSet());

        Set<Goal> children = rules.stream()
                .map(GoalRule::getChildGoal)
                .collect(Collectors.toSet());

        children.removeAll(parents);

        return children;
    }
}
