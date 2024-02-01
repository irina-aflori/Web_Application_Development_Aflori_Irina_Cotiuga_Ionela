import React, {Component} from "react";
import "./PlantDetails.css";
import Grid from "@material-ui/core/Grid";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {withRouter} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import plantService from "../../shared/services/plantService";
import {Box, Button} from "@material-ui/core";
import {Modal} from "@mui/material";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";

class PlantDetails extends Component {
    state = {
        plantDetails: {},
        showMoreDescription: false,
        showMoreMaintenance: false,
        showMoreDiseases: false,
        showMoreLocation: false,
        displayAddCommentModal: false,
        commentPlant: '',
        imagePlant: null
    };
    componentDidMount() {
        plantService.getPlantDetailsFromSparqlQuery({plantName: this.props.location.state.plantName, plantSpecies: this.props.location.state.plantSpeciesName}).then((plantDetails) => {
            this.setState({
                ...this.state,
                plantDetails: plantDetails
            });
        }).catch((err) => {
            console.log(err)
        });
    }
    handleChangeComment = event => {
        this.setState({
            ...this.state,
            commentPlant: event.target.value
        });
    };
    handleChangeImagePlant = event => {
        this.setState({
            ...this.state,
            imagePlant: URL.createObjectURL(event.target.files[0])
        });
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
                     style={{backgroundImage: `url(${this.state.plantDetails.plantImageURL})`, backgroundSize: "85%"}}
                >
                </div>
                </div>
                    <div className="plant-details-title">
                        <p id="plant-species-title-details">{this.props.location.state.plantSpeciesName}</p>
                        <p id="plant-title-details">{this.state.plantDetails.plantName}</p>
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
                        <p className="plus-plant-details">{this.state.plantDetails.plantDescription}</p>
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
                        <p className="plus-plant-details">{this.state.plantDetails.plantMaintenance}</p>
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
                        <p className="plus-plant-details">{this.state.plantDetails.plantDiseases}</p>
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
                        <p className="plus-plant-details">Latitude: <span style={{fontWeight: "bold"}}>{this.state.plantDetails.latitudeMarker}</span> - Longitude: <span style={{fontWeight: "bold"}}>{this.state.plantDetails.longitudeMarker}</span></p>
                        : ""}
                    </div>
                </Grid>
                <Button variant="contained" onClick={() => this.setState({...this.state, displayAddCommentModal: true})}
                        style={{backgroundColor: "#4A614A", color: "#E0E4DA", marginLeft: "45%", marginBottom: "3%", marginTop: "3%"}}>
                    Add a comment
                </Button>
                <Modal
                    open={this.state.displayAddCommentModal}
                    onClose={() => this.setState({displayAddCommentModal: false})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box style={{ position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)', width: 650, height: 500,
                        backgroundColor: '#e0e4da', borderRadius: "8px", border: '2px solid #000',
                        boxShadow: 24, p: 4}}>
                        <h2 className="modal-join-title">
                            Add a comment for {this.state.plantDetails.plantName} plant
                        </h2>
                        <div className="p-16">
                            <ValidatorForm
                                ref="form"
                                // onSubmit={() => this.handleSubmitComment(this.state.plantDetails.plantId, this.state.commentPlant, this.state.imagePlant)}
                            >
                                <Grid item lg={5} md={5} sm={5} xs={5} style={{marginLeft: "15%"}}>
                                    <TextValidator
                                        variant = "outlined"
                                        className="mb-16 w-100"
                                        label={"Your Comment"}
                                        type="text"
                                        onChange={this.handleChangeComment}
                                        name="comment"
                                        fullWidth
                                        required
                                        multiline={true}
                                        rows={7}
                                        rowsMax={7}
                                        style={{marginBottom: "10%", marginTop:"5%", width: "450px"}}
                                    />
                                    <p style={{color: "#4A614A", marginLeft: "50%", fontSize: "large", marginBottom: "3%", fontWeight: "bold"}}>Add an image</p>
                                    <TextValidator
                                        variant = "outlined"
                                        className="mb-16 w-100"
                                        type="file"
                                        onChange={this.handleChangeImagePlant}
                                        name="image"
                                        fullWidth
                                        style={{marginBottom: "10%", marginLeft: "25%"}}
                                    />
                                </Grid>
                                <div className="flex flex-space-between flex-middle" style={{marginLeft: "34%"}}>
                                    <Button variant="contained"  style={{backgroundColor: "#4A614A", color: "#E0E4DA", marginRight: "5%", minWidth: "90px", marginBottom: "3%", marginTop: "3%"}} type="submit">
                                        Save
                                    </Button>
                                    <Button variant="contained" color="primary"  style={{backgroundColor: "#4A614A", color: "#E0E4DA"}}
                                            onClick={() => {this.setState({...this.state, displayAddCommentModal: false})}}>
                                        Cancel
                                    </Button>
                                </div>
                            </ValidatorForm>
                        </div>
                    </Box>
                </Modal>
            </div>
        )}
}
export default withRouter(PlantDetails);