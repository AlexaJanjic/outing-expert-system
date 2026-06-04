package app.controller;

import app.dto.SearchRequest;
import app.dto.SearchResult;
import app.service.SearchService;
import app.service.TreeBuilderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private final TreeBuilderService treeBuilderService;

    @PostMapping
    public List<SearchResult> recommend(@RequestBody SearchRequest searchRequest){
        return searchService.recommend(searchRequest);
    }
}
