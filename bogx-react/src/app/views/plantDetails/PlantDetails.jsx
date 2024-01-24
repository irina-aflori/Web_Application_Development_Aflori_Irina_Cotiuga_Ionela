import React, {Component} from "react";
import "./PlantDetails.css";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";

class PlantDetails extends Component {
    state = {
        plantDetails: {},
        showMoreDescription: false,
        showMoreMaintenance: false,
        showMoreDiseases: false,
        showMoreLocation: false
    };
    render() {
        return (
            <div className="plant-details">
                <Nav className="navbar">
                    <div>
                        <img className="logo-menubar" src="/bogx-favicon.png" alt="logo" />
                    </div>
                </Nav>
                <div style={{display: "flex"}}>
                    <div style={{ marginLeft: "2%", marginTop: "1%"}}
                         onClick={() => this.props.history.goBack()}
                    >
                        <ArrowBackIcon style={{ width: "40px", height: "40px" }} />
                    </div>

                <div className="title-box-plant-details"
                     style={{backgroundImage: `url(${this.props.location.state.plant.plantImageURL})`, backgroundSize: "85%"}}
                >
                </div>
                </div>
                    <div className="plant-details-title">
                        <p id="plant-species-title-details">{this.props.location.state.plantSpecies}</p>
                        <p id="plant-title-details">{this.props.location.state.plant.plantName}</p>
                    </div>

                <Grid container style={{display: "grid"}}>
                    <div style={{borderBottom: "2px solid #888", marginLeft: "5%", marginRight: "5%", marginBottom: "2%"}}>
                    <div className="details-bottom" onClick={ () => this.setState({...this.state, showMoreDescription: !this.state.showMoreDescription})}>
                        <div className="icon-plant-details">
                            {this.state.showMoreDescription === false ? <AddIcon/> : <RemoveIcon/>}
                        </div>
                        <p id="description-plant-title">Characteristics & Description</p>
                    </div>
                    {this.state.showMoreDescription === true ?
                        <p className="plus-plant-details">{this.props.location.state.plant.plantDescription}</p>
                        : ""}
                    </div>
                    <div style={{borderBottom: "2px solid #888", marginLeft: "5%", marginRight: "5%", marginBottom: "2%"}}>
                    <div className="details-bottom" onClick={ () => this.setState({...this.state, showMoreMaintenance: !this.state.showMoreMaintenance})}>
                        <div className="icon-plant-details">
                            {this.state.showMoreMaintenance === false ? <AddIcon/> : <RemoveIcon/>}
                        </div>
                        <p id="location-plant-title">Maintenance tips</p>
                    </div>
                    {this.state.showMoreMaintenance === true ?
                        <p className="plus-plant-details">Land plants are multicellular organisms that can be distinguished from other living things by a number of characteristics.</p>
                        : ""}
                    </div>
                    <div style={{borderBottom: "2px solid #888", marginLeft: "5%", marginRight: "5%", marginBottom: "2%"}}>
                    <div className="details-bottom" onClick={ () => this.setState({...this.state, showMoreDiseases: !this.state.showMoreDiseases})}>
                        <div className="icon-plant-details">
                            {this.state.showMoreDiseases === false ? <AddIcon/> : <RemoveIcon/>}
                        </div>
                        <p id="location-plant-title">Pests & diseases</p>
                    </div>
                    {this.state.showMoreDiseases === true ?
                        <p className="plus-plant-details">Land plants are multicellular organisms that can be distinguished from other living things by a number of characteristics.</p>
                        : ""}
                    </div>
                    <div style={{borderBottom: "2px solid #888", marginLeft: "5%", marginRight: "5%", marginBottom: "2%"}}>
                    <div className="details-bottom" onClick={ () => this.setState({...this.state, showMoreLocation: !this.state.showMoreLocation})}>
                        <div className="icon-plant-details">
                            {this.state.showMoreLocation === false ? <AddIcon/> : <RemoveIcon/>}
                        </div>
                        <p id="location-plant-title">Location at Iasi Botanical Garden</p>
                    </div>
                    {this.state.showMoreLocation === true ?
                        <p className="plus-plant-details">Land plants are multicellular organisms that can be distinguished from other living things by a number of characteristics.</p>
                        : ""}
                    </div>
                </Grid>
            </div>
        )}
}
export default withRouter(PlantDetails);