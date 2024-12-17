import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavLinks, LogoEng, LogoCn } from "./NavBar.style";
import logo_en from "../../assets/PHANTOMLIKE_BLACK.png";
import logo_cn from "../../assets/PHANTOMLIKE_BLACK_CN.png";

const NavBar: React.FC = () => {
    return (
        <Navbar>
            <NavLinks>
                <li>
                    <Link to="/">
                        <LogoCn src={logo_cn} alt="Cn Logo" />
                        <LogoEng src={logo_en} alt="En Logo" />
                    </Link>
                </li>
            </NavLinks>

            <NavLinks>
                <li><Link to="/">Intro</Link></li>
                <li><Link to="/links">Links</Link></li>
                <li><Link to="/about">About Me</Link></li>
            </NavLinks>
        </Navbar>
    );
};

export default NavBar;
