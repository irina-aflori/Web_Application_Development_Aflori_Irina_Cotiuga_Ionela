package com.bogx.app.model;

public class Event {
    private String eventId;
    private String eventName;
    private String eventDescription;
    private Integer eventCapacity;
    private Integer eventParticipantCount;
    private String eventDate;
    private String eventStartTime;
    private String eventStopTime;
    public Event() {};

    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public Integer getEventCapacity() {
        return eventCapacity;
    }

    public void setEventCapacity(Integer eventCapacity) {
        this.eventCapacity = eventCapacity;
    }

    public Integer getEventParticipantCount() {
        return eventParticipantCount;
    }

    public void setEventParticipantCount(Integer eventParticipantCount) {
        this.eventParticipantCount = eventParticipantCount;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getEventStartTime() {
        return eventStartTime;
    }

    public void setEventStartTime(String eventStartTime) {
        this.eventStartTime = eventStartTime;
    }

    public String getEventStopTime() {
        return eventStopTime;
    }

    public void setEventStopTime(String eventStopTime) {
        this.eventStopTime = eventStopTime;
    }
}
