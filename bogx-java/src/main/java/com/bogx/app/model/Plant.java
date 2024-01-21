package com.bogx.app.model;

public class Plant {
    private String plantName;
    private String plantDescription;
    private String plantImageURL;

    public Plant() {};
    public Plant(String plantName, String plantDescription, String plantImageURL) {
        this.plantName = plantName;
        this.plantDescription = plantDescription;
        this.plantImageURL = plantImageURL;
    }

    public String getPlantName() {
        return plantName;
    }

    public void setPlantName(String plantName) {
        this.plantName = plantName;
    }

    public String getPlantDescription() {
        return plantDescription;
    }

    public void setPlantDescription(String plantDescription) {
        this.plantDescription = plantDescription;
    }

    public String getPlantImageURL() {
        return plantImageURL;
    }

    public void setPlantImageURL(String plantImageURL) {
        this.plantImageURL = plantImageURL;
    }
}
