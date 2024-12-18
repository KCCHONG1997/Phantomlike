import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import {  } from 'react-router-dom';
import Home from "../view/Home";
import Links from "../view/Links";
import About from "../view/About";

const MainRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/links" element={<Links />} />
            <Route path="/about" element={<About />} />
        </Routes>
    );
};

export default MainRoutes;
