package app.service;

import app.model.backward.Goal;
import app.model.backward.GoalRule;
import app.model.backward.SearchTree;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.drools.io.ClassPathResource;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service

public class TreeBuilderService {

    public ObjectMapper objectMapper;

    public TreeBuilderService(ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
    }

    public SearchTree build(Goal goal, Map<String, String> answers) {
        List<GoalRule> rules = new ArrayList<>();
        Map<String, Set<Goal>> answerGoals = new HashMap<>();

        try {
            String fileName = goal.name().toLowerCase().replace("_", "-") + ".json";

            ClassPathResource classPathResource = new ClassPathResource("data/" + fileName);

            TypeReference<Map<String, Map<String, List<List<String>>>>> type = new TypeReference<>() {
            };

            Map<String, Map<String, List<List<String>>>> config = objectMapper.readValue(classPathResource.getInputStream(), type);

            for (Map.Entry<String, String> answer : answers.entrySet()) {

                String questionId = answer.getKey();

                String selectedAnswer = answer.getValue();

                if (!config.containsKey(questionId)) {
                    continue;
                }

                Map<String, List<List<String>>> question = config.get(questionId);

                if (!question.containsKey(selectedAnswer)) {
                    continue;
                }

                List<List<String>> edges = question.get(selectedAnswer);

                for (List<String> edge : edges) {

                    Goal parent = Goal.valueOf(edge.get(0));
                    Goal child = Goal.valueOf(edge.get(1));

                    rules.add(new GoalRule(parent, child));

                    answerGoals.computeIfAbsent(questionId, k -> new HashSet<>()).add(child);
                }
            }

            Set<Goal> parents = rules.stream().map(GoalRule::getParentGoal).collect(Collectors.toSet());

            for(Set<Goal> goals: answerGoals.values()){
                goals.removeIf(parents::contains);
            }

            return new SearchTree(rules, answerGoals);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
