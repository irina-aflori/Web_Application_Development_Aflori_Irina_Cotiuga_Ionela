import React, {Component} from "react";
import "./Taxes.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {Card, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import sparqlService from "../../shared/services/sparqlService";

class Taxes extends Component {
    state = {
        taxesList: []
    };
    componentDidMount() {
        sparqlService.getTaxesFromSparqlQuery().then((taxesList) => {
            this.setState({
                ...this.state,
                taxesList: taxesList
            });
        }).catch((err) => {
            console.log(err)
        });
    }
    render() {
        return (
            <div className="taxes">
                <Sidebar/>
                <h1 className="taxes-title">Taxes & Services</h1>
                <Card className="w-100 overflow-auto" elevation={3} style={{marginLeft: "8%", marginRight: "8%"}}>
                    <Table className="table-taxes">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className="flex flex-middle mb-16" style={{fontWeight: "bold", fontSize: "large"}}>
                                        Type of service
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-middle mb-16" style={{minWidth: "60px", fontWeight: "bold", fontSize: "large"}}>
                                        Price
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.taxesList
                                .map((tax, index) => (
                                    <TableRow style={index % 2 ? {background: "#fdffe0"} : {background: "white"}}>
                                        <TableCell className="pl-sm-24 capitalize" align="left">
                                            {tax.taxName}
                                        </TableCell>
                                        <TableCell className="pl-sm-24 capitalize" align="left">
                                            {tax.taxPrice}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Card>
                <p id="add-note-taxes">*For civil marriage officiants, the time interval for which the fee will be charged starts from the moment the applicant brings the first materials (speakers, video cameras, etc.) and ends when the applicant releases the requested space.</p>
            </div>
        )
    }
}

export default withRouter(Taxes);