import React, {Component} from "react";
import "./Events.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import {Box, Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {Card, Modal, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import eventService from "../../shared/services/eventService";
import Person from "../../shared/models/Person";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Feedback from "../../shared/models/Feedback";

class Events extends Component {
    state = {
        openModalJoin: false,
        lastName: '',
        firstName: '',
        openModalFeedback: false,
        feedbackComment: '',
        name: '',
        futureEvents: [],
        pastEvents: [],
        joinedPersons: [],
        openModalJoinedList: false,
        feedbacksEvent: [],
        openModalFeedbackList: false,
        currentEventId: '',
        currentEvent: {}
    };
    componentDidMount() {
        eventService.getEventsFromSparqlQuery().then((events) => {
            let pastEvents = [];
            let futureEvents = [];
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            events.forEach(event => {
                let dateEvent = new Date(event.eventDate);
                let currentDate = new Date();
                let dayOfWeekEvent = days[dateEvent.getDay()];
                if (dateEvent.getTime() < currentDate.getTime()) {
                    event.day = dayOfWeekEvent;
                    pastEvents.push(event)
                }
                else {
                    event.day = dayOfWeekEvent;
                    futureEvents.push(event)
                }
            })
            this.setState({
                ...this.state,
                pastEvents: pastEvents,
                futureEvents: futureEvents
            });
        }).catch((err) => {
            console.log(err)
        });
    }
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
    handleSubmitJoin (eventId, lastName, firstName) {
        const person = new Person({lastNamePerson: lastName, firstNamePerson: firstName});
    eventService.joinEvent(eventId, person).then(() => {
        this.setState({
            ...this.state,
            openModalJoin: false
        });
        window.location.reload()
    }).catch((err) => {
        console.log(err)
    });
    }
    handleViewJoinedList(eventId) {
    eventService.getJoinedEventPersonsFromSparqlQuery(eventId).then((persons) => {
        this.setState({
            ...this.state,
            joinedPersons: persons
        });
    }).catch((err) => {
        console.log(err)
    });
    }
    handleSubmitFeedback (eventId, comment, name) {
        const feedback = new Feedback({feedbackName: name, feedbackComment: comment});
        eventService.addFeedbackToEvent(eventId, feedback).then(() => {
            this.setState({
                ...this.state,
                openModalFeedback: false
            });
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        });
    }
    handleViewFeedbackList(eventId) {
        eventService.getFeedbacksFromEvent(eventId).then((feedbacks) => {
            this.setState({
                ...this.state,
                feedbacksEvent: feedbacks
            });
        }).catch((err) => {
            console.log(err)
        });
    }
    render() {
        return (
            <div className="events">
                <Sidebar/>
                <div className="event-list">
                    <h2 className="event-general-title">FUTURE SCHEDULED EVENTS</h2>
                    {this.state.futureEvents != null ? this.state.futureEvents.map((event) => (
                            <Grid style={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item xs={3}>
                                    <div className="event-box">
                                        <p className="event-hour">{event.eventStartTime + "-" + event.eventStopTime}</p>
                                        <p className="event-date">{event.eventDate}</p>
                                        <p className="event-day">{event.day}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="event-box">
                                        <p className="event-title">{event.eventName}</p>
                                        <p className="event-description">{event.eventDescription}</p>
                                        <p className="event-joined">{event.eventParticipantCount + "/" + event.eventCapacity + " Joined"}</p>
                                        <Button id="submit-join-event" variant="contained" onClick={() => { this.setState({openModalJoin: true, currentEventId: event.eventId, currentEvent: event})}}>
                                            Join
                                        </Button>
                                        <div className="event-view-joined" onClick={() => {this.setState({...this.state, openModalJoinedList: true, currentEventId: event.eventId,  currentEvent: event}); this.handleViewJoinedList(event.eventId)}}> <Tooltip title="View Joined List"><VisibilityIcon/></Tooltip></div>
                                        <Modal
                                            open={this.state.openModalJoinedList}
                                            onClose={() => this.setState({openModalJoinedList: false})}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            className="modal-joined"
                                        >
                                            <Box style={{ position: 'absolute', top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)', width: 750, height: 500,
                                                backgroundColor: '#e0e4da', borderRadius: "8px", border: '2px solid #000',
                                                overflowY: "auto", boxShadow: 24, p: 4}}>
                                                <h4 className="modal-join-title">
                                                    View persons who joined the event {this.state.currentEvent.eventName}
                                                </h4>
                                                <div className="p-16">
                                                    <Card className="w-100 overflow-auto" elevation={3} style={{marginLeft: "8%", marginRight: "8%"}}>
                                                        <Table className="table-taxes">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        <div className="flex flex-middle mb-16" style={{fontWeight: "bold", fontSize: "small"}}>
                                                                            Last Name
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <div className="flex flex-middle mb-16" style={{minWidth: "60px", fontWeight: "bold", fontSize: "small"}}>
                                                                            First Name
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {this.state.joinedPersons
                                                                    .map((person, index) => (
                                                                        <TableRow style={index % 2 ? {background: "#fdffe0"} : {background: "white"}}>
                                                                            <TableCell className="pl-sm-24 capitalize" align="left">
                                                                                {person.lastNamePerson}
                                                                            </TableCell>
                                                                            <TableCell className="pl-sm-24 capitalize" align="left">
                                                                                {person.firstNamePerson}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Card>
                                                </div>
                                                        <Button variant="contained" style={{backgroundColor: "#783D19", color: "#E0E4DA", marginLeft: "42%", marginTop: "3%", marginBottom: "3%"}}
                                                                onClick={() => {this.setState({...this.state, openModalJoinedList: false})}}>
                                                            Close
                                                        </Button>
                                            </Box>
                                        </Modal>
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
                                                    {this.state.currentEvent.eventName}
                                                </h4>
                                                <div className="p-16">
                                                    <ValidatorForm
                                                        ref="form"
                                                        onSubmit={() => this.handleSubmitJoin(this.state.currentEventId, this.state.lastName, this.state.firstName)}
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
                                                                style={{marginBottom: "10%"}}
                                                            />
                                                        </Grid>
                                                        <div className="flex flex-space-between flex-middle" style={{marginLeft: "34%"}}>
                                                            <Button variant="contained"  type="submit" style={{backgroundColor: "#783D19", color: "#E0E4DA", marginRight: "4%", minWidth: "90px"}}>
                                                                Save
                                                            </Button>
                                                            <Button variant="contained" style={{backgroundColor: "#783D19", color: "#E0E4DA"}}
                                                                    onClick={() => {this.setState({...this.state, openModalJoin: false})}}>
                                                                Cancel
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
                    {this.state.pastEvents != null ? this.state.pastEvents.map((event) => (
                            <Grid style={{display: "flex", justifyContent: "space-between"}}>
                                <Grid item xs={3}>
                                    <div className="event-box">
                                        <p className="event-hour">{event.eventStartTime + "-" + event.eventStopTime}</p>
                                        <p className="event-date">{event.eventDate}</p>
                                        <p className="event-day">{event.day}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={8}>
                                    <div className="event-box">
                                        <p className="event-title">{event.eventName}</p>
                                        <p className="event-description">{event.eventDescription}</p>
                                        <Button id="submit-feedback-event" variant="contained" onClick={() => this.setState({openModalFeedback: true, currentEventId: event.eventId, currentEvent: event})}>
                                            Tell us about your experience
                                        </Button>
                                        <div className="event-view-joined" onClick={() => {this.setState({...this.state, openModalFeedbackList: true, currentEventId: event.eventId, currentEvent: event}); this.handleViewFeedbackList(event.eventId)}}> <Tooltip title="View Event Feedback"><VisibilityIcon/></Tooltip></div>
                                        <Modal
                                            open={this.state.openModalFeedbackList}
                                            onClose={() => this.setState({openModalFeedbackList: false})}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                            className="modal-joined"
                                        >
                                            <Box style={{ position: 'absolute', top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)', width: 750, height: 500,
                                                backgroundColor: '#e0e4da', borderRadius: "8px", border: '2px solid #000',
                                                overflowY: "auto", boxShadow: 24, p: 4}}>
                                                <h4 className="modal-join-title">
                                                    View feedback of the event {this.state.currentEvent.eventName}
                                                </h4>
                                                <div className="p-16">
                                                    {this.state.feedbacksEvent != null ? this.state.feedbacksEvent.map((feedback) => (
                                                        <Grid item style={{padding: "15px"}}>
                                                            <div className="feedback-box">
                                                                <p id="name-feedback-comment">{feedback.feedbackName}</p>
                                                                <p id="feedback-comment">{feedback.feedbackComment}</p>
                                                            </div>
                                                        </Grid>
                                                        ))
                                                        : <p> There is no feedback for this event </p>}
                                                </div>
                                                <Button variant="contained"  style={{backgroundColor: "#783D19", color: "#E0E4DA", marginLeft: "42%", marginTop: "3%", marginBottom: "3%"}}
                                                        onClick={() => {this.setState({...this.state, openModalFeedbackList: false})}}>
                                                    Close
                                                </Button>
                                            </Box>
                                        </Modal>
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
                                                    {this.state.currentEvent.eventName}
                                                </h4>
                                                <div className="p-16">
                                                    <ValidatorForm
                                                        ref="form"
                                                        onSubmit={() => this.handleSubmitFeedback(this.state.currentEventId, this.state.feedbackComment, this.state.name)}
                                                    >
                                                        <Grid item lg={5} md={5} sm={5} xs={5} style={{marginLeft: "17%"}}>
                                                            <TextValidator
                                                                variant = "outlined"
                                                                className="mb-16 w-100"
                                                                label={"Your Feedback"}
                                                                type="text"
                                                                onChange={this.handleChangeFeedback}
                                                                name="feedback"
                                                                required
                                                                multiline={true}
                                                                rows={4}
                                                                rowsMax={4}
                                                                style={{marginBottom: "10%", marginTop:"5%", width: "400px"}}
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
                                                                style={{marginBottom: "10%", marginLeft: "30%"}}
                                                            />
                                                        </Grid>
                                                        <div className="flex flex-space-between flex-middle" style={{marginLeft: "34%"}}>
                                                            <Button variant="contained" type="submit" style={{marginRight: "4%", minWidth: "90px", backgroundColor: "#783D19", color: "#E0E4DA"}}>
                                                                Save
                                                            </Button>
                                                            <Button variant="contained" style={{backgroundColor: "#783D19", color: "#E0E4DA"}}
                                                                    onClick={() => {this.setState({...this.state, openModalFeedback: false})}}>
                                                                Cancel
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