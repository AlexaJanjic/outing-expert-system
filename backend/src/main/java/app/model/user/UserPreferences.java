package app.model.user;

import jakarta.persistence.*;
import app.model.enums.EventType;
import app.model.enums.MusicType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ElementCollection
    private List<MusicType> preferredMusic;
    @ElementCollection
    private List<EventType> preferredEventTypes;
    private Integer budget;
    private boolean likesCrowd;
    private int groupSize;
}