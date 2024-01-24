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
                {/*<Card className="w-100 overflow-auto" elevation={3} style={{margin: "5%"}}>*/}
                {/*    <Table className="table-taxes"*/}
                {/*           // style={{ whiteSpace: "pre", minWidth: "750px" }}*/}
                {/*    >*/}
                {/*        <TableHead>*/}
                {/*            <TableRow>*/}
                {/*                <TableCell>*/}
                {/*                    <div className="flex flex-middle mb-16">*/}
                {/*                        A*/}
                {/*                    </div>*/}
                {/*                    <div className="flex flex-middle mb-16">*/}
                {/*                    </div>*/}
                {/*                </TableCell>*/}
                {/*            </TableRow>*/}
                {/*                          </TableHead>*/}
                {/*        <TableBody>*/}
                {/*            {["ab", "acz"]*/}
                {/*                .map((sport, index) => (*/}
                {/*                    <TableRow style ={ index % 2? { background : "#fdffe0" }:{ background : "white" }}>*/}
                {/*                        <TableCell className="pl-sm-24 capitalize" align="left">*/}
                {/*                        </TableCell>*/}
                {/*                    </TableRow>*/}
                {/*                ))}*/}
                {/*        </TableBody>*/}
                {/*    </Table>*/}
                {/*</Card>*/}
            </div>
        )}
}
export default withRouter(Taxes);