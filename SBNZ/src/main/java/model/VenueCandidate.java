package model;

public class VenueCandidate {

    private Venue venue;
    private int score;

    public  VenueCandidate(){}

    public VenueCandidate(Venue venue, int score){
        this.venue = venue;
        this.score = score;
    }

    public Venue getVenue() {
        return venue;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}
