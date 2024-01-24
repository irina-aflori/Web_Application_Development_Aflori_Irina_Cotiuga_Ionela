import React, {Component} from "react";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import history from "../../../history";
import Sidebar from "../utils/Sidebar/Sidebar";
import {withRouter} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Sidebar/>
                <h1 id="home-title">Welcome to the website of the Botanical Garden</h1>
                <p id="home-subtitle">Explore all the interesting information about plant species and trees. Take part
                    in all the events and exhibitions organized throughout the year. Enjoy nature!</p>
                <div className="bottom-page">
                    <div id="home-choose-user">
                        <div>
                            <p id="home-user-type">What kind of experience would you like to have?</p>
                            <Grid container spacing={4} style={{marginTop: "15px"}}>
                                <Grid item xs={4}>
                                    <div className="home-grid" onClick={()=> {history.push({pathname: '/season-preferences', detail: 'simple_visitor'}); window.location.reload()}}>
                                    <img src="/images/single-person-home.png" alt="home-image" id="single-person-home"/>
                                        <p className="home-box-text">Simple visitor</p>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="home-grid" onClick={()=> {history.push({pathname: '/season-preferences', detail: 'group_children'}); window.location.reload()}}>
                                        <img src="/images/group-children-home.png" alt="home-image" id="group-children-home"/>
                                        <p className="home-box-text">Group of children</p>
                                    </div>
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="home-grid" onClick={()=> {history.push({pathname: '/season-preferences', detail: 'botanist'}); window.location.reload()}}>
                                        <img src="/images/botanist-home.png" alt="home-image" id="botanist-home"/>
                                        <p className="home-box-text">Advanced botanist</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <img src="/images/home-img.png" alt="home-image" className="home-image"/>
                </div>
            </div>
        )
    }

}

export default withRouter(Home);