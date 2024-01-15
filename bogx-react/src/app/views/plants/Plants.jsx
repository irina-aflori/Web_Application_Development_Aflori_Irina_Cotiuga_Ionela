import React, {Component} from "react";
import "./Plants.css";
import Sidebar from "../utils/Sidebar/Sidebar";

class Map extends Component {
    render() {
        return (
            <div className="plants">
                <Sidebar/>
                <div id="plants-title">Plants - Rosaceae Species </div>
            </div>
        )}
}
export default Map;