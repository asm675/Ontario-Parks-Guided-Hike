/***
 *
 * Landing Page when the application is opened.
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/

import React from 'react';
import image from '../assets/about_paral.jpg';
import '../assets/App.css'

const About = () => {
    return (<div>
            <div id='image' style={{backgroundImage: `url(${image})`}}>
                <p className='title_background'>Welcome to Arrowhead<br/>My Guided Hike</p>
            </div>
            <div className='divider'></div>
            <h1 className='section_header'>About This App</h1>
            <div className='row_content'>
                <p className='about_text'>
                    Welcome to Ontario Parks Virtual Guide! This app uses geolocation capabilities on your smart device
                    to guide you on your journey through different ontario parks. With no more than 3 clicks, visitors
                    will be able to find out about their surrounding! From eating areas to local events to even RV
                    repair, this app guides you to your destination with ease. This guide is interactive so it allows
                    users to customize and learn from auditory and visual aids, helping the community and visitors
                    alike.
                </p>
            </div>

            <div className='divider'></div>

            <h1 className='section_header'>About Provincial Parks</h1>
            <div className='row_content'>
                <div className='row_image'><img alt="icon" className="about_image"
                                                src={require("../assets/ontariologo.png")}></img></div>
                <p className='about_text'>
                    The Ontario Parks system began its long and varied history in 1893 with the creation of Algonquin
                    Provincial Park, originally designed to protect loggers’ interests from settlement and to protect
                    the headwaters of several rivers. The management and creation of provincial parks came under the
                    Department of Lands and Forests in 1954 and led to a period of accelerated park creation: a
                    nine-fold increase in the number of parks over the next six years.
                </p>
            </div>

            <div className='divider'></div>

            <h1 className='section_header'>How To Use</h1>
            <div className='row_content'>
                <p className='about_text'>
                    Our web app works as an interactive way to explore Arrowhead Provincial Park. This is done by having points of interest set up by a certified park naturalist on a map of the park. These points of interest can be accessed by clicking on the marker when the user is within a certain radius of each point encouraging the user to explore the park and visit different points of interest. Each point contains a photo, an audio recording and a short description of what the point describes.
                </p>
                {/* button that redirects to the map */}

                <div className='row_image'><img alt="" className="about_image" src={require("../assets/park.jpg")}></img></div>
            </div>

            <div className='row_content'>
                    <button className='button' onClick={() => window.location.href = '/map'}>Go To Map</button>
                </div>

            {/*

            HOW TO USE IMPORTANT:

            use the following lines of code to easily add new rows on the about page. Customizable but set to 2 items, 1 image and 1 picture. 
            Items are centered so it will center if you choose to only use an image or picture.
            The picture will dissapear when the screen shrinks small enough.
            The above 3 are examples.

            <div className='row_content'>
                <p className='about_text'>
                    TODO: add about text
                </p>
                <div className='row_image'><img className="about_image" src={require("TODO:image_path")}></img></div>
            </div> */}
        </div>);
};

export default About;