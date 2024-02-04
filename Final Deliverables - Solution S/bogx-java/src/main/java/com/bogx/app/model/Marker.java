package com.bogx.app.model;

public class Marker {
    private String imageMarker;
    private Double latitudeMarker;
    private Double longitudeMarker;

    public Marker() {};

    public String getImageMarker() {
        return imageMarker;
    }

    public void setImageMarker(String imageMarker) {
        this.imageMarker = imageMarker;
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
}
