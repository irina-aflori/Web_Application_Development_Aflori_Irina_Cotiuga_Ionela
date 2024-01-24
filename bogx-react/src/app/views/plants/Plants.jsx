import React, {Component} from "react";
import "./Plants.css";
import Grid from "@material-ui/core/Grid";
import plantService from "../../shared/services/plantService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Button} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "react-bootstrap/Nav";

class Plants extends Component {
    state = {
        plantsList: [],
        plantSpeciesImg: this.props.location.state.plantSpeciesImage
    };

    componentDidMount() {
        plantService.getPlants({plantSpecies: this.props.location.state.plantSpeciesName}).then((plantsList) => {
            this.setState({
                ...this.state,
                plantsList: plantsList
            });
        }).catch((err) => {
            console.log(err)
        });
    }

    render() {
        return (
            <div className="plants">
                <Nav className="navbar">
                    <div>
                        <img className="logo-menubar" src="/bogx-favicon.png" alt="logo" />
                    </div>
                </Nav>
                <div style={{display: "flex"}}>
                    <div style={{marginLeft: "2%", marginTop: "1%"}}
                         onClick={() => this.props.history.goBack()}
                    >
                        <ArrowBackIcon style={{width: "40px", height: "40px"}}/>
                    </div>
                    <div
                        // className="title-box-plant-species"
                        className="title-box-plants" style={{
                        backgroundImage: `url(${this.state.plantSpeciesImg})`,
                        backgroundSize: "85% 105%",
                        marginLeft: "26%"
                    }}
                    >
                    </div>
                </div>
                <p id="plants-title">Plants - {this.props.location.state.plantSpeciesName} Species </p>
                <Grid container>
                    {this.state.plantsList && this.state.plantsList
                        .map((plant, index) => (
                            <Grid item xs={4}>
                                <div className="box-plants" onClick={() => {
                                    this.props.history.push({
                                        pathname: '/plant-details',
                                        state: {plant: plant, plantSpecies: this.props.location.state.plantSpeciesName}
                                    })
                                }}>
                                    <img src={plant.plantImageURL} alt="plant-name-img" id="plant-name-img"/>
                                    <div className="plant-name">{plant.plantName}</div>
                                </div>
                            </Grid>))}
                </Grid>
            </div>
        )
    }
}

export default withRouter(Plants);