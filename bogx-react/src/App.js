import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes, Switch, useNavigate} from "react-router-dom";
import "./App.css";
import AppContext from "./appContext";
import Home from "./app/views/home/Home";
import SeasonPreferences from "./app/views/seasonPreferences/SeasonPreferences";
import Map from "./app/views/map/Map";
import Events from "./app/views/events/Events";
import Taxes from "./app/views/taxes/Taxes";
import Plants from "./app/views/plants/Plants";
import PlantSpecies from "./app/views/plantSpecies/PlantSpecies";
import PlantDetails from "./app/views/plantDetails/PlantDetails";
import PlantComments from "./app/views/plantComments/PlantComments";
import history from "./history";
const App = () => {
    const [user, setUser] = useState({});
    return (
        <AppContext.Provider value={{user, setUser}}>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/season-preferences" component={SeasonPreferences}/>
                        <Route exact path="/map" component={Map}/>
                        <Route exact path="/events" component={Events}/>
                        <Route exact path="/taxes" component={Taxes}/>
                        <Route exact path="/plants" component={Plants}/>
                        <Route exact path="/plants-species" component={PlantSpecies}/>
                        <Route exact path="/plant-details" component={PlantDetails}/>
                        <Route exact path="/comments-plants" component={PlantComments}/>
                    </Switch>
                </div>
            </Router>
        </AppContext.Provider>
    );
};

export default App;

