package app.model.recommendation;

import app.model.enums.EventType;
import app.model.enums.MusicType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "venues")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ElementCollection(targetClass = MusicType.class)
    @Enumerated(EnumType.STRING)
    private List<MusicType> supportedMusic;
    private float averagePrice;
    private boolean crowded;
    private int capacity;
    @ElementCollection(targetClass = EventType.class)
    @Enumerated(EnumType.STRING)
    private List<EventType> events;
    private boolean djPerformance;
    private boolean privateTables;
    private boolean premiumService;
    private boolean outdoorSeating;
    private boolean qualityFood;
    private boolean gamesAvailable;
    private boolean sportsStreaming;
    private int noiseLevel;
    private int socialLevel;
    private int atmosphereLevel;
    private int comfortLevel;
    private int serviceLevel;
}