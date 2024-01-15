import React, { useState } from "react";
import "./Sidebar.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Nav from "react-bootstrap/Nav";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";

const NavIcon = styled(Link)``;
const SidebarNav = styled.nav`
  right: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;
const SidebarWrap = styled.div``;
const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <Nav className="navbar">
        <div>
          <img className="logo-menubar" src="/bogx-favicon.png" alt="logo" />
        </div>
        <NavIcon to="#" className="nav-icon">
          <MenuIcon id="icon-navbar" onClick={showSidebar} />
        </NavIcon>
      </Nav>
      <SidebarNav className="sidebar-nav" sidebar={sidebar}>
        <SidebarWrap className="sidebar-wrap">
          <NavIcon to="#" className="nav-icon">
            <CloseIcon onClick={showSidebar} id="icon-close" />
          </NavIcon>
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;
