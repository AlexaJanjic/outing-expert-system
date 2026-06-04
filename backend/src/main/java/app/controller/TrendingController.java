package app.controller;

import app.model.recommendation.Recommendation;
import app.repository.VenueRepository;
import app.service.CepService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/trending")
@RequiredArgsConstructor
public class TrendingController {
    private final VenueRepository venueRepository;
    private final CepService cepService;

    @GetMapping("/ids")
    public Set<Long> trendingIds(){
        return cepService.getTrendingVenueIds();
    }

    @GetMapping
    public List<Recommendation> trending(){
        List<Recommendation> results = new ArrayList<>();
        cepService.getTrendingVenueIds().forEach(id -> {
            venueRepository.findById(id).ifPresent(venue -> {
                results.add(new Recommendation(venue.getId(), venue.getName(), 0));
            });
        });

        return results;
    }
    @GetMapping("/crowded")
    public Set<Long> crowded(){return cepService.getCrowdedVenueIds();}

    @PostMapping
    public void trend(@RequestParam("id") Long id){
        for(int i = 0; i < 30; i++){
            cepService.insertReservation(id);
        }
    }
}
