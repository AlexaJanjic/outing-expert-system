package app.cep;

import lombok.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReservationEvent {
    private Long venueId;
    private Date dateTime;
}
