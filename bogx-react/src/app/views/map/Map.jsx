import React, {Component} from "react";
import "./Map.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import DirectionsIcon from '@mui/icons-material/Directions';

const ZOOM_LEVEL = 14.8;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: {
                latitude: 47.1855,
                longitude: 27.5513
            },
            map: null,
            displayText: false
        };
        this.mapRef = React.createRef(); // Create a ref for the map container
        this.displayLocation = this.displayLocation.bind(this);
        this.showMap = this.showMap.bind(this);
        // this.displayRoute = this.displayRoute.bind(this);
    }

    displayLocation(position) {
        console.log("displayLocation: ", position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({latitude, longitude});

        this.showMap(position.coords);
    }

    showMap(coords) {
        console.log("showMap: ", coords);
        const googleLatLong = new window.google.maps.LatLng(coords.latitude, coords.longitude);

        const mapOptions = {
            zoom: ZOOM_LEVEL,
            center: googleLatLong,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        };

        const mapDiv = this.mapRef.current;
        const map = new window.google.maps.Map(mapDiv, mapOptions);

        this.setState({map});

        window.google.maps.event.addListener(map, "click", (event) => {
            const clickedLat = event.latLng.lat();
            const clickedLng = event.latLng.lng();

            this.setState({
                coordinates: {
                    latitude: clickedLat,
                    longitude: clickedLng
                }
            });

            map.panTo(event.latLng);
        });
    }

    initializeMap = () => {
        const {latitude, longitude} = this.state.coordinates;
        const coords = {latitude, longitude};

        this.showMap(coords);
    }
    displayRoute = (startPosition, endPosition) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(this.state.map);

        const request = {
            origin: startPosition,
            destination: endPosition,
            travelMode: 'WALKING'
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            } else {
                console.error(`Directions request failed due to ${status}`);
            }
        });
    }

    componentDidMount() {
        this.initializeMap();
        // const entranceCoords = { lat: this.state.coordinates.latitude, lng: this.state.coordinates.longitude }; // Replace with actual entrance coordinates
        // const plantCoords = { lat: 47.1720, lng: 27.5840 }; // Replace with your chosen plant's coordinates
        //
        // this.displayRoute(entranceCoords, plantCoords);
        // this.displayRoute("iasi", "vaslui");

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.displayLocation);
        // } else {
        //     alert("Sorry, this browser doesn't support geolocation!");
        // }
    }

    render() {
        const {latitude, longitude} = this.state.coordinates;
        return (
            <div className="map">
                <Sidebar/>
                <div className="show-map">
                    <div style={{display: "flex"}}>
                    <p id="location"> Geographic coordinates: {latitude}, {longitude}</p>
                    <Button className="button-display-route" style={{backgroundColor: "#4A614A", width: "fit-content", height: "40px", color: "#e0e4da", marginTop: "5%", marginLeft: "5%", fontSize: "smaller"}}
                        //     onClick={ () => {    const entranceCoords = { lat: 47.1867, lng: 27.55745 }; // Replace with actual entrance coordinates
                        // const plantCoords = { lat: 47.1854, lng: 27.5504 };
                        //
                        // this.displayRoute(entranceCoords, plantCoords)}}
                        onClick={ () => this.setState({displayText: !this.state.displayText})}
                    >
                        Show Route
                        <IconButton>
                            <DirectionsIcon/>
                        </IconButton>
                    </Button>
                        {this.state.displayText && (
                            <p style={{marginTop: "5%", marginLeft: "2%", color: "#4A614A", marginRight: "7%"}}>Select the marker - plant you want to see</p>
                        )}
                    </div>
                    <div ref={this.mapRef} id="map" style={{height: '380px', width: '84%'}}>
                        Loading...
                    </div>
                </div>
                {/*<div style={{backgroundColor: "black", width: "100px", height: "100px"}} onClick={ () => {    const entranceCoords = { lat: 47.1867, lng: 27.55745 }; // Replace with actual entrance coordinates*/}
                {/*    const plantCoords = { lat: 47.1854, lng: 27.5504 };*/}

                {/*    this.displayRoute(entranceCoords, plantCoords)}}> </div>*/}
            </div>
        )
    }
}

export default withRouter(Map);