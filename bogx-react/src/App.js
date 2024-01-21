import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import AppContext from "./appContext";
import Home from "./app/views/home/Home";
import SeasonPreferences from "./app/views/seasonPreferences/SeasonPreferences";
import Map from "./app/views/map/Map";
import Events from "./app/views/events/Events";
import Taxes from "./app/views/taxes/Taxes";
import Plants from "./app/views/plants/Plants";
import PlantSpecies from "./app/views/plantSpecies/PlantSpecies";
import history from "./history";

const App = () => {
    const [user, setUser] = useState({});
    return (
        <AppContext.Provider value={{user, setUser}}>
            <Router history={history}>
                <div>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/season-preferences" element={<SeasonPreferences/>}/>
                        <Route exact path="/map" element={<Map/>}/>
                        <Route exact path="/events" element={<Events/>}/>
                        <Route exact path="/taxes" element={<Taxes/>}/>
                        <Route exact path="/plants" element={<Plants/>}/>
                        <Route exact path="/plants-species" element={<PlantSpecies/>}/>
                    </Routes>
                </div>
            </Router>
        </AppContext.Provider>
    );
};

export default App;

