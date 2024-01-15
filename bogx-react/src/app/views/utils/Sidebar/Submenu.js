import React, { useState } from "react";
import {Link} from 'react-router-dom';
import styled from "styled-components";
import "./Submenu.css";
const SidebarLink = styled(Link)``;
const SidebarLabel = styled.span``;
const DropdownLink = styled(Link)``;

const Submenu = ({item}) => {
    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)
    return (
        <>
        <SidebarLink className="sidebar-link" to={item.path} onClick={item.subNav && showSubnav}>
            <div>
                {item.icon}
                <SidebarLabel className="sidebar-label">{item.title}</SidebarLabel>
            </div>
            <div>
                {item.subNav && subnav 
                ? item.iconOpened
            :item.subNav
            ? item.iconClosed
        :null}
            </div>
        </SidebarLink>
        {subnav && item.subNav.map((item, index) => {
            return (
                <DropdownLink className="drop-down" to={item.path} key={index}>
                    {item.icon}
                    <SidebarLabel className="sidebar-label">{item.title}</SidebarLabel>
                </DropdownLink>
            )
        })}
        </>
    );
};
export default Submenu;