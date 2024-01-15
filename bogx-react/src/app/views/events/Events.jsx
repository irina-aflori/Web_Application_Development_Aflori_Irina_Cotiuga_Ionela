import React, {Component} from "react";
import "./Events.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";

const events = [
    {
        title: "Guided tours with the presentation of the greenhouses in the Iasi Botanical Garden",
        description: "This tour is conducted in the presence of a guide who will present all the interesting details about the latest changes in the greenhouses.",
        startTime: "10.00",
        stopTime: "12.00",
        date: "10-02-2024",
        joined: "10",
        available: "20"
    },
    {
        title: "Annual Pollution Prevention Discussing Meeting ",
        description: "This meeting aims to discuss the best practices for preventing pollution and the activities we are considering in the Iasi Botanical Garden in this regard.",
        startTime: "09.00",
        stopTime: "11.00",
        date: "22-03-2024",
        joined: "10",
        available: "20"
    },

]

class Events extends Component {
    render() {
        return (
            <div className="events">
                <Sidebar/>
                <div className="event-list">
                    <h2 className="event-general-title">FUTURE SCHEDULED EVENTS</h2>
                    {events != null ? events.map((event) => (
                            <Grid style={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item xs={3}>
                                    <div className="event-box">
                                        <p className="event-hour">{event.startTime + "-" + event.stopTime}</p>
                                        <p className="event-date">{event.date}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="event-box">
                                        <p className="event-title">{event.title}</p>
                                        <p className="event-description">{event.description}</p>
                                        <p className="event-joined">{event.joined + "/" + event.available + " Joined"}</p>
                                        <Button id="submit-join-event" variant="contained">
                                            Join
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        ))
                        : ""}
                    <h2 className="event-general-title">PAST EVENTS</h2>
                    {events != null ? events.map((event) => (
                            <Grid style={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item xs={3}>
                                    <div className="event-box">
                                        <p className="event-hour">{event.startTime + "-" + event.stopTime}</p>
                                        <p className="event-date">{event.date}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="event-box">
                                        <p className="event-title">{event.title}</p>
                                        <p className="event-description">{event.description}</p>
                                        <Button id="submit-feedback-event" variant="contained">
                                            Tell us about your experience
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        ))
                        : ""}
                </div>
            </div>
        )
    }
}

export default Events;