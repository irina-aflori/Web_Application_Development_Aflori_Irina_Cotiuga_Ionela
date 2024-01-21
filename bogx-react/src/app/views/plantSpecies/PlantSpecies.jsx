import React, {Component} from "react";
import "./PlantSpecies.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import plantSpeciesService from "../../shared/services/plantSpeciesService";

class PlantSpecies extends Component {
    state = {
        plantSpeciesList: []
    };
    componentDidMount() {
                plantSpeciesService.getPlantSpecies().then((plantSpeciesList) => {
                    this.setState({
                        ...this.state,
                        plantSpeciesList: plantSpeciesList
                    });
                }).catch((err) => {
                    console.log(err)
                });
    }
    render() {
        return (
            <div className="plant-species">
                <Sidebar/>
                <div className="title-box-plant-species">
                <p id="plant-species-title">Species of plants</p>
                </div>
                <Grid container>
                    {this.state.plantSpeciesList && this.state.plantSpeciesList
                        .map((plantSpecies, index) => (
                    <Grid item xs={4}>
                        <div className="box-plant-species">
                            <img src={plantSpecies.plantSpeciesImageURL} alt="plant-type-img" id="plant-type-img"/>
                            <div className="plant-category-name">{plantSpecies.plantSpeciesName}</div>
                        </div>
                    </Grid>))}
                </Grid>
            </div>
        )}
}
export default PlantSpecies;