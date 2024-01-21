package com.bogx.app.model;

public class PlantSpecies {
    private String plantSpeciesName;
    private String plantSpeciesImageURL;

    public PlantSpecies(String plantSpeciesName, String plantSpeciesImageURL) {
        this.plantSpeciesName = plantSpeciesName;
        this.plantSpeciesImageURL = plantSpeciesImageURL;
    }

    public String getPlantSpeciesName() {
        return plantSpeciesName;
    }

    public void setPlantSpeciesName(String plantSpeciesName) {
        this.plantSpeciesName = plantSpeciesName;
    }

    public String getPlantSpeciesImageURL() {
        return plantSpeciesImageURL;
    }

    public void setPlantSpeciesImageURL(String plantSpeciesImageURL) {
        this.plantSpeciesImageURL = plantSpeciesImageURL;
    }
}
