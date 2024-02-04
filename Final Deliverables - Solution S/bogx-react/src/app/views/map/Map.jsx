import React, {Component} from "react";
import "./Map.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {Button, IconButton} from "@material-ui/core";
import DirectionsIcon from '@mui/icons-material/Directions';
import markerService from "../../shared/services/markerService";

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
            displayText: false,
            markers: []
        };
        this.mapRef = React.createRef(); // Create a ref for the map container
        this.displayLocation = this.displayLocation.bind(this);
        this.showMap = this.showMap.bind(this);
    }
    componentDidMount() {
        markerService.getMarkersFromSparqlQuery().then((markersList) => {
            this.setState({
                ...this.state,
                markers: markersList
            });
            this.initializeMap(markersList);
        }).catch((err) => {
            console.log(err)
        });
    }

    displayLocation(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({latitude, longitude});

        this.showMap(position.coords);
    }

    showMap(coords, markersList) {
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
        this.displayMarkers(map, markersList);
    }

    initializeMap = (markersList) => {
        const {latitude, longitude} = this.state.coordinates;
        const coords = {latitude, longitude};

        this.showMap(coords, markersList);
    }
    displayRoute = (startPosition, endPosition, isDisplayed) => {
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        if (isDisplayed === true) {
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
        else
            this.initializeMap(this.state.markers);
    }
    displayMarkers(map, loadedMarkers) {
        let created_markers = [];
        var latlngbounds = new window.google.maps.LatLngBounds();

        loadedMarkers.forEach(dataMarker => {
            var myLatlng = new window.google.maps.LatLng(
                dataMarker.latitudeMarker,
                dataMarker.longitudeMarker
            );
            var marker = new window.google.maps.Marker({
                position: myLatlng,
                map: map,
                // code: data.code,
            });
            const icon = {
                url: dataMarker.imageMarker, // url
                scaledSize: new window.google.maps.Size(24,24), // scaled size
                origin: new window.google.maps.Point(0, 0), // origin
                anchor: new window.google.maps.Point(0, 0), // anchor
            };
            marker.setIcon(icon);
            created_markers = [ ...created_markers, marker]
            latlngbounds.extend(myLatlng);
            marker.addListener("click",  () => {
                this.handleMarkerClick(dataMarker.latitudeMarker, dataMarker.longitudeMarker)

            });
        });
        if (loadedMarkers.length > 0) {
            map.fitBounds(latlngbounds);
        }
    }
    handleMarkerClick (latitude, longitude) {
        if (this.state.displayText)
            this.displayRoute( {lat: 47.1867, lng: 27.55745}, {lat: latitude, lng: longitude}, true)

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
                        onClick={ () => this.setState({displayText: !this.state.displayText})}
                    >
                        Show Route
                        <IconButton>
                            <DirectionsIcon/>
                        </IconButton>
                    </Button>
                        {this.state.displayText && (
                            <p style={{marginTop: "5%", marginLeft: "2%", color: "#4A614A", marginRight: "7%", fontSize: "large"}}>Select a marker</p>
                        )}
                        {this.state.displayText && <Button className="button-display-route" style={{backgroundColor: "#4A614A", width: "fit-content", height: "40px", color: "#e0e4da", marginTop: "5%", marginLeft: "5%", fontSize: "smaller"}}
                                onClick={ () => {this.displayRoute(null, null, false); this.setState({displayText: !this.state.displayText})}}
                        >
                            Clear Route
                            <IconButton>
                                <DirectionsIcon/>
                            </IconButton>
                        </Button>}
                    </div>
                    <div ref={this.mapRef} id="map" style={{height: '380px', width: '84%'}}>
                        Loading...
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Map);