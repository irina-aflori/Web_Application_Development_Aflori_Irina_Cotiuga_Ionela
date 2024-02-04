import React, {Component} from "react";
import "./PlantSpecies.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import Grid from "@material-ui/core/Grid";
import { withRouter } from 'react-router-dom';
import plantService from "../../shared/services/plantService";

class PlantSpecies extends Component {
    state = {
        plantSpeciesList: []
    };
    componentDidMount() {

        let query;
        if (this.props.location.state && this.props.location.state.seasons) query = this.props.location.state.seasons
        else query = ['Spring', 'Summer', 'Autumn', 'Winter']
        plantService.getPlantSpeciesFromSeasonRecommendations({seasons: query}).then((plantSpeciesList) => {
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
                <Grid container style={{paddingLeft: "5%"}}>
                    {this.state.plantSpeciesList && this.state.plantSpeciesList
                        .map((plantSpecies, index) => (
                    <Grid item xs={4}>
                        <div className="box-plant-species" onClick={ () => {this.props.history.push({pathname: '/plants', state: {plantSpeciesName: plantSpecies.plantSpeciesName, plantSpeciesImage: plantSpecies.plantSpeciesImageURL}, search: new URLSearchParams({[plantSpecies]: plantSpecies.plantSpeciesName }).toString()})}}>
                            <img src={plantSpecies.plantSpeciesImageURL} alt="plant-type-img" id="plant-type-img"/>
                            <div className="plant-category-name">{plantSpecies.plantSpeciesName}</div>
                        </div>
                    </Grid>))}
                </Grid>
            </div>
        )}
}
export default withRouter(PlantSpecies);