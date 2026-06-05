package app.controller;

import app.dto.VenueDto;
import app.service.VenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/venues")
@RequiredArgsConstructor
public class VenueController {
    private final VenueService venueService;

    @GetMapping("/{id}")
    public VenueDto getVenue(@PathVariable("id") Long id){
        return venueService.getVenue(id);
    }
}
