import React, {Component} from "react";
import "./Home.css";
import Grid from "@material-ui/core/Grid";
import history from "../../../history";
import {withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class Home extends Component {
    render() {
        return (
            <div className="home">
                <Nav className="navbar">
                    <div>
                        <img className="logo-menubar" src="/bogx-favicon.png" alt="logo" />
                    </div>
                </Nav>
                <h1 id="home-title">Welcome to the website of the Botanical Garden</h1>
                <p id="home-subtitle">Explore all the interesting information about plant species and trees. Take part
                    in all the events and exhibitions organized throughout the year. Enjoy nature!</p>
                <div className="bottom-page">
                    <div className="home-start">
                                <Grid item xs={4}>
                                    <div className="home-grid" onClick={()=> {history.push({pathname: '/season-preferences', detail: 'simple_visitor'}); window.location.reload()}}>
                                    <img src="/images/home.png" alt="home-image" id="single-person-home"/>
                                        <p className="home-box-text">Start your experience in our application</p>
                                    </div>
                                </Grid>
                    </div>
                    <img src="/images/home-img.png" alt="home-image" className="home-image"/>
                </div>
            </div>
        )
    }

}

export default withRouter(Home);