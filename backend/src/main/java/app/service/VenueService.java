package app.service;

import app.dto.VenueDto;
import app.model.recommendation.Venue;
import app.repository.VenueRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VenueService {
    private final VenueRepository venueRepository;
    private final CepService cepService;

    public VenueDto getVenue(Long id){

        ModelMapper mapper = new ModelMapper();
        Venue venue =  venueRepository.findById(id).orElseThrow();

        VenueDto venueDto = mapper.map(venue, VenueDto.class);
        venueDto.setTrending(cepService.getTrendingVenueIds().contains(id));
        venueDto.setCrowded(cepService.getCrowdedVenueIds().contains(id));

        return venueDto;
    }
}
