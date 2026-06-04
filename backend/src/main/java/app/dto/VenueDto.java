package app.dto;


import app.model.enums.EventType;
import app.model.enums.MusicType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VenueDto {
    private Long id;
    private String name;
    private List<MusicType> supportedMusic;
    private float averagePrice;
    private boolean crowded;
    private boolean trending;
    private int capacity;
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