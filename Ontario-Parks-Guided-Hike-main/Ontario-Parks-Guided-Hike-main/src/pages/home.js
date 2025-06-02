/***
 *
 * Responsible for loading the Map from the components/Map folder
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/
import React from 'react';
import Map from '../components/Map/index'


const map = () => {
    return (
        <div id="map">
            <Map/>
        </div>
    )
};

export default map;