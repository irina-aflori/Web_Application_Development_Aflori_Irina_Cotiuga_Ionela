package com.bogx.app.model;

public class Plant {
    private String plantName;
    private String plantId;
    private String plantDescription;
    private String plantImageURL;
    private String plantDiseases;
    private String plantMaintenance;
    private Double latitudeMarker;
    private Double longitudeMarker;
    private String seasons;

    public Plant() {};
    public Plant(String plantName, String plantDescription, String plantImageURL, String plantDiseases, String plantMaintenance) {
        this.plantName = plantName;
        this.plantDescription = plantDescription;
        this.plantImageURL = plantImageURL;
        this.plantDiseases = plantDiseases;
        this.plantMaintenance = plantMaintenance;
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

    public String getPlantDiseases() {
        return plantDiseases;
    }

    public void setPlantDiseases(String plantDiseases) {
        this.plantDiseases = plantDiseases;
    }

    public String getPlantMaintenance() {
        return plantMaintenance;
    }

    public void setPlantMaintenance(String plantMaintenance) {
        this.plantMaintenance = plantMaintenance;
    }

    public Double getLatitudeMarker() {
        return latitudeMarker;
    }

    public void setLatitudeMarker(Double latitudeMarker) {
        this.latitudeMarker = latitudeMarker;
    }

    public Double getLongitudeMarker() {
        return longitudeMarker;
    }

    public void setLongitudeMarker(Double longitudeMarker) {
        this.longitudeMarker = longitudeMarker;
    }

    public String getPlantId() {
        return plantId;
    }

    public void setPlantId(String plantId) {
        this.plantId = plantId;
    }

    public String getSeasons() {
        return seasons;
    }

    public void setSeasons(String seasons) {
        this.seasons = seasons;
    }
}
