package com.bogx.app.model;

public class Feedback {
    private String feedbackName;
    private String feedbackComment;
    private String feedbackImage;
    private String feedbackDate;
    private String feedbackPlantName;
    public Feedback(){};

    public String getFeedbackName() {
        return feedbackName;
    }

    public void setFeedbackName(String feedbackName) {
        this.feedbackName = feedbackName;
    }

    public String getFeedbackComment() {
        return feedbackComment;
    }

    public void setFeedbackComment(String feedbackComment) {
        this.feedbackComment = feedbackComment;
    }

    public String getFeedbackImage() {
        return feedbackImage;
    }

    public void setFeedbackImage(String feedbackImage) {
        this.feedbackImage = feedbackImage;
    }

    public String getFeedbackDate() {
        return feedbackDate;
    }

    public void setFeedbackDate(String feedbackDate) {
        this.feedbackDate = feedbackDate;
    }

    public String getFeedbackPlantName() {
        return feedbackPlantName;
    }

    public void setFeedbackPlantName(String feedbackPlantName) {
        this.feedbackPlantName = feedbackPlantName;
    }
}
