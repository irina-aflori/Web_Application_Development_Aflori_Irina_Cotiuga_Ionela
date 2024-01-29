import React, {Component} from "react";
import "./Events.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import {Box, Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {Modal} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

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
    state = {
        openModalJoin: false,
        lastName: '',
        firstName: '',
        openModalFeedback: false,
        feedbackComment: '',
        name: ''
    };
    handleChangeLastName = event => {
        this.setState({
            ...this.state,
            lastName: event.target.value
        });
    };
    handleChangeFirstName = event => {
        this.setState({
            ...this.state,
            firstName: event.target.value
        });
    };
    handleChangeFeedback = event => {
        this.setState({
            ...this.state,
            feedbackComment: event.target.value
        });
    };
    handleChangeName = event => {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    };
    handleSubmitJoin () {

    }
    handleSubmitFeedback () {

    }
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
                                        <Button id="submit-join-event" variant="contained" onClick={() => this.setState({openModalJoin: true})}>
                                            Join
                                        </Button>
                                        <Modal
                                            open={this.state.openModalJoin}
                                            onClose={() => this.setState({openModalJoin: false})}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box style={{ position: 'absolute', top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)', width: 600, height: 350,
                                                backgroundColor: '#e0e4da', borderRadius: "8px", border: '2px solid #000',
                                                boxShadow: 24, p: 4}}>
                                                <h2 className="modal-join-title">
                                                    Join our scheduled event
                                                </h2>
                                                <h4 className="modal-description">
                                                    {event.title}
                                                </h4>
                                                <div className="p-16">
                                                    <ValidatorForm
                                                        ref="form"
                                                        onSubmit={this.handleSubmitJoin}
                                                    >
                                                        <Grid item lg={5} md={5} sm={5} xs={5} style={{marginLeft: "30%"}}>
                                                            <TextValidator
                                                                variant = "outlined"
                                                                className="mb-16 w-100"
                                                                label={"Last Name"}
                                                                type="text"
                                                                onChange={this.handleChangeLastName}
                                                                name="lastName"
                                                                fullWidth
                                                                required
                                                                // value={lastName || ''}
                                                                style={{marginBottom: "10%", marginTop:"5%"}}
                                                            />
                                                            <TextValidator
                                                                variant = "outlined"
                                                                className="mb-16 w-100"
                                                                label={"First Name"}
                                                                type="text"
                                                                required
                                                                onChange={this.handleChangeFirstName}
                                                                name="firstName"
                                                                fullWidth
                                                                // value={firstName|| ''}
                                                                style={{marginBottom: "10%"}}
                                                            />
                                                        </Grid>
                                                        <div className="flex flex-space-between flex-middle" style={{marginLeft: "45%"}}>
                                                            <Button variant="contained" color="primary" type="submit">
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </ValidatorForm>
                                                </div>
                                            </Box>
                                        </Modal>
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
                                        <Button id="submit-feedback-event" variant="contained" onClick={() => this.setState({openModalFeedback: true})}>
                                            Tell us about your experience
                                        </Button>
                                        <Modal
                                            open={this.state.openModalFeedback}
                                            onClose={() => this.setState({openModalFeedback: false})}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box style={{ position: 'absolute', top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)', width: 600, height: 400,
                                                backgroundColor: '#e0e4da', borderRadius: "8px", border: '2px solid #000',
                                                boxShadow: 24, p: 4}}>
                                                <h2 className="modal-join-title">
                                                    Tell us about your experience
                                                </h2>
                                                <h4 className="modal-description">
                                                    {event.title}
                                                </h4>
                                                <div className="p-16">
                                                    <ValidatorForm
                                                        ref="form"
                                                        onSubmit={this.handleSubmitFeedback}
                                                    >
                                                        <Grid item lg={5} md={5} sm={5} xs={5} style={{marginLeft: "30%"}}>
                                                            <TextValidator
                                                                variant = "outlined"
                                                                className="mb-16 w-100"
                                                                label={"Your Feedback"}
                                                                type="text"
                                                                onChange={this.handleChangeFeedback}
                                                                name="feedback"
                                                                fullWidth
                                                                required
                                                                multiline={true}
                                                                rows={3}
                                                                rowsMax={3}
                                                                // value={lastName || ''}
                                                                style={{marginBottom: "10%", marginTop:"5%"}}
                                                            />
                                                            <TextValidator
                                                                variant = "outlined"
                                                                className="mb-16 w-100"
                                                                label={"Your Name"}
                                                                type="text"
                                                                required
                                                                onChange={this.handleChangeName}
                                                                name="name"
                                                                fullWidth
                                                                // value={firstName|| ''}
                                                                style={{marginBottom: "10%"}}
                                                            />
                                                        </Grid>
                                                        <div className="flex flex-space-between flex-middle" style={{marginLeft: "45%"}}>
                                                            <Button variant="contained" color="primary" type="submit">
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </ValidatorForm>
                                                </div>
                                            </Box>
                                        </Modal>
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

export default withRouter(Events);