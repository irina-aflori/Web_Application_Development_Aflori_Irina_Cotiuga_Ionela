import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Sidebar from "../utils/Sidebar/Sidebar";
import "./PlantComments.css";
import Grid from "@material-ui/core/Grid";


const plantComments = [
    {
        plantComment: "Chrysanthemums (mums) are one of the most popular fall garden flowers.",
        datePlantComment: "10-01-2024",
        imagePlantComment: "https://agro-tv.ro/wp-content/uploads/2020/05/Gradina-botanica-Iasi.jpg"
    },
    {
        plantComment: "Tulips are perennial herbaceous bulbiferous geophytes that bloom in spring and die back after flowering to an underground storage bulb.",
        datePlantComment: "15-01-2024",
        imagePlantComment: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsWobh334zwA8pABqEhtbAaC1byQtuzrDfPyZY2pVydXrnxrF0FaLdepxsBKgf8ZrEpCU&usqp=CAU"
    },

]
class PlantComments extends Component {
    state = {
        plantComments: []
    }
    render() {
        return (
            <div className="comments-plant">
                <Sidebar/>
                <h1 className="comments-title">Other opinions about plants</h1>
                {plantComments != null ? plantComments.map((plantComment) => (
                        <Grid item>
                            <div className="comment-box">
                                <p id="date-plant-comment">{plantComment.datePlantComment}</p>
                                <p id="plant-comment">{plantComment.plantComment}</p>
                                <img src={plantComment.imagePlantComment} alt="plant-comment-img" id="plant-comment-img"/>
                                {/*<p className="event-hour">{event.startTime + "-" + event.stopTime}</p>*/}
                                {/*<p className="event-date">{event.date}</p>*/}
                            </div>
                        </Grid>
                    ))
                    : ""}
            </div>
        )
    }
}

export default withRouter(PlantComments);