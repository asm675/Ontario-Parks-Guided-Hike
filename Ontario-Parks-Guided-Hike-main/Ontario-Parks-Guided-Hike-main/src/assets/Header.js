/***
 *
 * Responsible for creating the navbar that appears on all the pages
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/
import logo from './ontariologo.png';
import React, {useRef} from "react";
import {Link} from "react-router-dom";

import './App.css';
import {FaBars, FaTimes} from "react-icons/all";

function removeBackground() {
    try {
        document.getElementsByTagName("div")[1].hidden = true;
        document.getElementById('col-sm').hidden = true;
    } catch (e) {
        console.log(e.message)
    }
}

function addBackgroundBack() {
    try {
        document.getElementsByTagName("div")[1].hidden = false;
        document.getElementById('col-sm').hidden = false;

    } catch (e) {
        console.log(e.message)
    }
}

const Header = () => {

    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <a href="https://www.ontarioparks.com/en"><img src={logo} className="logo" alt="logo"/></a>
            <nav ref={navRef}>
                <Link className='nav_link' to="/map" onClick={() => {
                    showNavBar()
                }}>Map</Link>
                <Link className='nav_link' to="/About" onClick={() => {
                    showNavBar()
                }}>About</Link>
                <a href="https://www.ontarioparks.com/park/arrowhead">Arrowhead</a>
                <button
                    className="nav-btn nav-close-btn"
                    onClick={() => {
                        showNavBar();
                        addBackgroundBack();
                    }}>
                    <FaTimes/>
                </button>
            </nav>

            <button className="nav-btn" onClick={() => {
                showNavBar();
                removeBackground();
            }}>
                <FaBars/>
            </button>
        </header>

    );
}

export default Header;
