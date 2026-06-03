package app.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class RecommendationSessionDto {
    private Long id;
    private LocalDateTime createdAt;
    private List<RecommendationHistoryDto> recommendations;
}