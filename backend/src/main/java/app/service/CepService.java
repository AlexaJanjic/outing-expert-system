package app.service;

import app.cep.CrowdedVenueFact;
import app.cep.ReservationEvent;
import app.cep.TrendingVenueFact;
import lombok.RequiredArgsConstructor;
import org.kie.api.KieBase;
import org.kie.api.KieBaseConfiguration;
import org.kie.api.KieServices;
import org.kie.api.conf.EventProcessingOption;
import org.kie.api.io.ResourceType;
import org.kie.api.runtime.KieSession;
import org.kie.internal.io.ResourceFactory;
import org.kie.internal.utils.KieHelper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CepService {

    private final KieSession cepSession;

    public CepService() {

        KieHelper helper = new KieHelper();

        helper.addResource(ResourceFactory.newClassPathResource("rules/cep/cep.drl"), ResourceType.DRL);

        KieBaseConfiguration config = KieServices.Factory.get().newKieBaseConfiguration();

        config.setOption(EventProcessingOption.STREAM);

        KieBase kieBase = helper.build(config);

        this.cepSession = kieBase.newKieSession();
    }

    public void insertReservation(Long venueId) {

        cepSession.insert(new ReservationEvent(venueId, new Date()));

        cepSession.fireAllRules();
    }

    public void insertReservationOld(Long venueId) {

        cepSession.insert(new ReservationEvent(venueId, new Date(System.currentTimeMillis() - 2 * 60 * 60 * 1000)));

        cepSession.fireAllRules();
    }
    public Set<Long> getTrendingVenueIds() {

        return cepSession.getObjects(o -> o instanceof TrendingVenueFact)
                .stream()
                .map(o -> (TrendingVenueFact) o)
                .map(TrendingVenueFact::getVenueId)
                .collect(Collectors.toSet());
    }


    public Set<Long> getCrowdedVenueIds() {

        return cepSession.getObjects(o -> o instanceof CrowdedVenueFact)
                .stream()
                .map(o -> (CrowdedVenueFact) o)
                .map(CrowdedVenueFact::getVenueId)
                .collect(Collectors.toSet());
    }
}
