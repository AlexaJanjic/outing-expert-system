package model;

import java.util.List;

public class Venue {
    private String name;
    private List<MusicType> supportedMusic;
    private float averagePrice;
    private boolean crowded;
    private int score = 0;

    public  Venue() {}

    public  Venue(String name, List<MusicType> musicType, float averagePrice, boolean crowded){
        this.name = name;
        this.supportedMusic = musicType;
        this.averagePrice = averagePrice;
        this.crowded = crowded;
    }

    public String getName() {
        return name;
    }

    public List<MusicType> getSupportedMusic() {
        return supportedMusic;
    }

    public float getAveragePrice() {
        return averagePrice;
    }

    public boolean isCrowded() {
        return crowded;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
