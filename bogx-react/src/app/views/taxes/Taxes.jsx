import React, {Component} from "react";
import "./Taxes.css";
import Sidebar from "../utils/Sidebar/Sidebar";
import {withRouter} from "react-router-dom";
import {Card, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

class Taxes extends Component {
    render() {
        return (
            <div className="taxes">
                <Sidebar/>
                <h1 className="taxes-title">Taxes & Services</h1>
                <Card className="w-100 overflow-auto" elevation={3} style={{margin: "5%"}}>
                    <Table className="table-taxes"
                           // style={{ whiteSpace: "pre", minWidth: "750px" }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className="flex flex-middle mb-16">
                                        A
                                    </div>
                                    <div className="flex flex-middle mb-16">
                                        {/*<TextField*/}
                                        {/*    variant="outlined"*/}
                                        {/*    name="name.ro"*/}
                                        {/*    value = {this.state.query["name.ro"] || ''}*/}
                                        {/*    className="mr-32"*/}
                                        {/*    onKeyDown={this.handleKeyDown}*/}
                                        {/*    onChange={this.handleChange}*/}
                                        {/*    inputProps={{*/}
                                        {/*        style: {*/}
                                        {/*            padding: "9px 10px",*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*    InputProps={{*/}
                                        {/*        classes: {*/}
                                        {/*            notchedOutline: this.state.query["name.ro"] ? classes.notchedOutline : ''*/}
                                        {/*        }*/}
                                        {/*    }}*/}
                                        {/*/>*/}
                                    </div>
                                </TableCell>
                            </TableRow>
                            {/*<tr><td colSpan="2"> { this.state.loading && <LinearProgress />}</td></tr>*/}
                        </TableHead>
                        <TableBody>
                            {["ab", "acz"]
                                .map((sport, index) => (
                                    <TableRow style ={ index % 2? { background : "#fdffe0" }:{ background : "white" }}>
                                        <TableCell className="pl-sm-24 capitalize" align="left">
                                            {/*<a className="text-primary"*/}
                                            {/*   style={{cursor:'pointer'}}*/}
                                            {/*   onClick={() => this.handleViewClick(sport.id)}*/}
                                            {/*>*/}
                                            {/*    {sport.name[i18n.language]}*/}
                                            {/*</a>*/}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        )}
}
export default withRouter(Taxes);