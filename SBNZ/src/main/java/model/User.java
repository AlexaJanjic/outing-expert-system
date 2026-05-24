package model;

import java.util.List;

public class User {
    private String name;
    private List<MusicType> preferredMusic;
    private float budget;
    private boolean likesCrowd;


    public  User() {}

    public User(String name, List<MusicType> preferredMusic, float budget, boolean likesCrowd){
        this.name = name;
        this.preferredMusic = preferredMusic;
        this.budget = budget;
        this.likesCrowd = likesCrowd;
    }

    public String getName() {
        return name;
    }

    public List<MusicType> getPreferredMusic() {
        return preferredMusic;
    }

    public float getBudget() {
        return budget;
    }

    public boolean likesCrowd() {
        return likesCrowd;
    }

    public boolean likesAnyMusic(List<MusicType> venueMusic) {

        for (MusicType type : preferredMusic) {
            if (venueMusic.contains(type)) {
                return true;
            }
        }

        return false;
    }
}
