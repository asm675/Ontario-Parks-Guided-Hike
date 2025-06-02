/***
 *
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/

import './assets/App.css';
import Header from './assets/Header';
import About from './pages/about';
import Admin from './pages/admin';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import APIContext, {usePOIContext} from "../src/Contexts/APIContext";

import Map from "./components/Map";
import Footer from './assets/Footer';
import Login from './pages/login.js';

function App() {
    // POI DATA Context
    const poi_data = (
        <APIContext.Provider value={usePOIContext()}>
            <Map/>
        </APIContext.Provider>
    )

    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path='/' exact element={<About/>}/>
                <Route path='/map' exact element={poi_data}/>
                <Route path='/About' exact element={<About/>}/>
                <Route path='/Admin' exact element={<Admin/>}/>
                <Route path="/Login" exact element={<Login/>}/>
            </Routes>
            <Footer/>
        </Router>

    );
}

export default App;
