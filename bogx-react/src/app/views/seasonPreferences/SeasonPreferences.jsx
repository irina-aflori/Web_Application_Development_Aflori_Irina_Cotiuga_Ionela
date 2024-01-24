import React, {Component} from "react";
import "./SeasonPreferences.css";
import Grid from "@material-ui/core/Grid";
import {Button, Checkbox} from "@material-ui/core";
import Sidebar from "../utils/Sidebar/Sidebar";
import history from "../../../history";
import {withRouter} from "react-router-dom";

class SeasonPreferences extends Component {
    render() {
        return (
            <div className="season-preferences">
                <Sidebar/>
                <h4 id="text-choose-season">Choose your favorite seasons. We will filter all the relevant information
                    (presentation of plant species, types of trees, existing fauna, care methods, planting and
                    conservation practices, scheduled events, and relevant studies) from the periods you select.</h4>
                <div className="season-bottom-page">
                    <Grid container style={{width: "40%", marginLeft: "10%"}}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="choose-season" >
                                <img src="/images/spring-season.png" alt="spring-season" id="spring-season-choose"/>
                                <div className="season-text-choose">
                                <p className="season-box-text">Spring</p>
                                    <Checkbox color="success" />
                                </div>
                            </div>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <div className="choose-season" >
                                <img src="/images/summer-season.png" alt="summer-season" id="summer-season-choose"/>
                                <div className="season-text-choose">
                                    <p className="season-box-text">Summer</p>
                                    <Checkbox color="success" />
                                </div>
                            </div>
                        </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div className="choose-season">
                                    <img src="/images/autumn-season.png" alt="autumn-season" id="autumn-season-choose"/>
                                    <div className="season-text-choose">
                                        <p className="season-box-text">Autumn</p>
                                        <Checkbox color="success" />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div className="choose-season">
                                    <img src="/images/winter-season.png" alt="winter-season" id="winter-season-choose"/>
                                    <div className="season-text-choose">
                                        <p className="season-box-text">Winter</p>
                                        <Checkbox color="success" />
                                    </div>
                                </div>
                            </Grid>
                        <Button id="season-submit" variant="contained"
                                onClick={()=> {history.push('/map'); window.location.reload()}}
                        >Save</Button>
                    </Grid>
                    <img src="/images/home-img.png" alt="home-image" className="home-image"/>
                </div>
            </div>
        )
    }

}

export default withRouter(SeasonPreferences);