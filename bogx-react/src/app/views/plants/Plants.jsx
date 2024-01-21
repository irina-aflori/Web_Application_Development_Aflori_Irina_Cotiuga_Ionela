import React, {Component} from "react";
import "./Plants.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import {plantRepository} from "../../shared/repositories/plantRepository";

class Plant extends Component {
    state = {
        plantsList: []
    };
    componentDidMount() {
        plantRepository.getPlants().then((plantsList) => {
            console.log("PLANTS: ", plantsList)
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
                <Sidebar/>
                <div className="title-box-plant-species"
                    // className="title-box-plants" style={{backgroundImage: {...this.props.image}}}
                >
                    <p id="plants-title">Plants - Chrysanthemum Species </p>
                </div>
                <Grid container>
                    {this.state.plantsList && this.state.plantsList
                        .map((plant, index) => (
                            <Grid item xs={4}>
                                <div className="box-plants">
                                    <img src={plant.plantImageURL} alt="plant-name-img" id="plant-name-img"/>
                                    <div className="plant-name">{plant.plantName}</div>
                                </div>
                            </Grid>))}
                </Grid>
            </div>
        )}
}
export default Plant;