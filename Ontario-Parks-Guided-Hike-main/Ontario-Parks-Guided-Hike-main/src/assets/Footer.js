/***
 *
 * Responsible for creating the Footer which is used on all pages
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/


import React from "react";
import './App.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (<div className="main-footer">
            <div className="row">
                <p id="col-sm">
                    <span style={{fontWeight: 'bold'}}>
                        &copy;{new Date().getFullYear()} Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved | <Link
                        className='nav_link' to='/Login'>Admin</Link>
                    </span>
                </p>
            </div>
        </div>)
}

export default Footer;