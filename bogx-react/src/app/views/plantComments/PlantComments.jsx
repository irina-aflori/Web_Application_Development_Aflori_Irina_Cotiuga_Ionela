import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Sidebar from "../utils/Sidebar/Sidebar";
import "./PlantComments.css";
import Grid from "@material-ui/core/Grid";
import plantService from "../../shared/services/plantService";


class PlantComments extends Component {
    state = {
        plantComments: []
    };
    componentDidMount() {
        plantService.getPlantsComments().then((plantComments) => {
            this.setState({
                ...this.state,
                plantComments: plantComments
            });
        }).catch((error) => {
            console.log(error);
        });
    };
    render() {
        return (
            <div className="comments-plant">
                <Sidebar/>
                <h1 className="comments-title">Other opinions about plants</h1>
                {this.state.plantComments && this.state.plantComments
                    .map((plantComments) => (
                        <Grid item>
                            <div className="comment-box">
                                <p id="date-plant-comment">{plantComments.feedbackDate}</p>
                                <p id="plant-comment">{plantComments.feedbackComment}</p>
                                <img src={plantComments.feedbackImage} alt="plant-comment-img" id="plant-comment-img"/>
                            </div>
                        </Grid>
                    ))
                    }
            </div>
        )
    }
}

export default withRouter(PlantComments);