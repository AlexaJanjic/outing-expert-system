package model;

public class Recommendation {

    private String venueName;
    private int finalScore;

    public Recommendation(){}

    public Recommendation(String venueName, int finalScore){
        this.venueName = venueName;
        this.finalScore = finalScore;
    }

    public String getVenueName() {
        return venueName;
    }

    public int getFinalScore() {
        return finalScore;
    }

    @Override
    public String toString() {
        return "Recommended venue: " + venueName +
                " | Score: " + finalScore;
    }
}
