/***
 * Contains the main business logic behind the guided tour
 * Responsible for creating the Map, getting the POI"s from the backend and displaying them using custom markers.
 *
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/


import React, {useEffect, useState} from 'react';
import{ GoogleMap, useLoadScript, Marker, InfoWindowF, Circle, MarkerF} from "@react-google-maps/api";
import {Fragment} from "react";
import axios from "axios";
import './markers.css';
import {useNavigate} from "react-router-dom";

const mapContainerStyle = {
    width: '100vw', height: '90vh'
};

const centre = {
    lat: 45.39174103906428, lng: -79.21467830118779
};



function MyComponent(){
    const navigate = useNavigate();
    const [ stateA, setStateA ] = useState(true);
    const [ stateB, setStateB ] = useState(true);
    const [ stateC, setStateC ] = useState(true);

    const places = [];
    // TODO: Change this URL to localhost if you want to test backend with frontend locally, else change to deployed backend URL
    const URL = "https://my-guided-hike.herokuapp.com/";
    const AnimalData = [];
    const FloraData = [];
    const Randoms = [];

    const in_colour = {
            strokeColor: "#ff0000"
    }

    const options = {
        // disableDefaultUI: true
    }


    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);
    const [userPos, setUserPos] = useState({});

    // This useEffect is for getting and displaying the user location on the map
    useEffect(() => {
        const id = setInterval(() => {
            const options2 = {
                enableHighAccuracy: true, timeout: 5000, maximumAge: 0,
            };

            function success(pos) {
                const crd = pos.coords;
                console.log("Your current position is:");
                console.log(`Latitude : ${crd.latitude}`);
                console.log(`Longitude: ${crd.longitude}`);
                console.log(`More or less ${crd.accuracy} meters.`);
                setUserPos({
                    latitude: crd.latitude, longitude: crd.longitude,
                });


                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    if (calcCrow(item.latitude, item.longitude, userPos.latitude, userPos.longitude, 0.01) === true) {
                        setSelected(item)
                        console.log("we are in the circle", item);
                        break
                    } else {
                        setSelected(null);
                    }

                }
            }

            function error(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
            }

            navigator.geolocation.getCurrentPosition(success, error, options2);
           }, 2000);

        return () => clearInterval(id);
    }, [userPos.latitude, userPos.longitude]);


    const config = {
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        axios.get(URL, config).then(res => {
            setData(res.data)
        })
    }, [])

    function pointInCircle(x0, y0, x1, y1, r) {
        return Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r

    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2, r)
    {
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d < r;
    }

    // Converts numeric degrees to radians
    function toRad(Value)
    {
        return Value * Math.PI / 180;
    }

    // TODO: REPLACE THIS TOKEN WITH YOUR NEW API TOKEN TO LOAD THE MAP
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyAZmjDFkwSxp3n9FUJM0_VYDxO29uIgWk4"
    })

    // All 3 handleStates are for use in filtering the points via the legend
    function handleStateA(e) {
        console.log(e.target.value);
        if (stateA === false) {
            setStateA(true);
        } else {
            setStateA(false)
        }
    }


    function handleStateB(e) {
        console.log(e.target.value);
        if (stateB === false) {
            setStateB(true);
        } else {
            setStateB(false)
        }
    }


    function handleStateC(e) {
        console.log(e.target.value);
        if (stateC === false) {
            setStateC(true);
        } else {
            setStateC(false)
        }
    }

    // Seperates data into different categories to be displayed on map
    data.map((q) => {
        if (q['data_object']['POI_DATA_Type'] === "Animal") {
            AnimalData.push(q);
        } else if (q['data_object']['POI_DATA_Type'] === "Plant") {
            FloraData.push(q);

        } else if (q['data_object']['POI_DATA_Type'] === "Historical") {
            Randoms.push(q);
        }
        places.push([q.latitude, q.longitude])
    });

    if(loadError) return "Error Loading Map";
    if(!isLoaded) return "Loading Maps";
    // console.log(places);
    return <div>


        <div className='legend'>


            <h3>Legend</h3>
            <div id="check"><input className="check" type="checkbox" onChange={handleStateA} checked={stateA}
                                   id="animal"></input><label for="animal"> Animal<img alt="animal" src='/animal2.svg'></img></label>
            </div>
            <div id="check"><input className="check" type="checkbox" onChange={handleStateB} checked={stateB}
                                   id="plant"></input><label for="plant"> Plant<img alt="plant" src='/plant.svg'></img></label>
            </div>
            <div id="check"><input className="check" type="checkbox" onChange={handleStateC} checked={stateC}
                                   id="historical"></input><label for="historical"> Historical<img alt="history" src='/historical.svg'></img></label>
            </div>


        </div>
        {/*The below GoogleMap renders the map and its points, the Infowindow is what pops up and displays the details of the points*/}
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={centre} options={options}>
            {/*<button id="pan-button" onClick={()=> GoogleMap.panTo({lat:userPos.latitude, lng:userPos.longitude})}>Pan Location</button>*/}

            <Fragment>
                <MarkerF key="user" position={{lat: userPos.latitude, lng: userPos.longitude}}
                         icon={{ url: '/userloc.svg', scaledSize: new window.google.maps.Size(30, 30),
                             origin: new window.google.maps.Point(0,0),
                             anchor: new window.google.maps.Point(15, 15)
                         }}
                />
            </Fragment>


            {
                AnimalData.map(x => {
                    return (
                        <Fragment>
                            <Marker position={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}}
                                    icon={{ url: '/animal2.svg', scaledSize: new window.google.maps.Size(30, 30),
                                        origin: new window.google.maps.Point(0,0),
                                        anchor: new window.google.maps.Point(15, 15)
                                    }}
                                    visible={stateA}

                            />
                            <Circle center={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}} radius={10} visible={false}
                            options={in_colour}
                            />
                        </Fragment>
                    )
                })
            }

            {
                FloraData.map(x => {
                    return (
                        <Fragment>
                            <Marker position={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}}
                                    icon={{ url: '/plant.svg', scaledSize: new window.google.maps.Size(30, 30),
                                        origin: new window.google.maps.Point(0,0),
                                        anchor: new window.google.maps.Point(15, 15)
                                    }}
                                    visible={stateB}

                            />
                            <Circle center={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}} radius={10} visible={false}
                                    options={in_colour}
                            />
                        </Fragment>
                    )
                })
            }

            {
                Randoms.map(x => {
                    return (
                        <Fragment>
                            <Marker position={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}}
                                    icon={{ url: '/historical.svg', scaledSize: new window.google.maps.Size(30, 30),
                                        origin: new window.google.maps.Point(0,0),
                                        anchor: new window.google.maps.Point(15, 15)
                                    }}
                                    visible={stateC}

                            />
                            <Circle center={{lat: parseFloat(x.latitude), lng: parseFloat(x.longitude)}} radius={10} visible={false}
                                    options={in_colour}
                            />
                        </Fragment>
                    )
                })
            }

            {selected ? (
                <InfoWindowF position={{lat: parseFloat(selected.latitude), lng: parseFloat(selected.longitude)}}
                            // onCloseClick={() => {
                            //     setSelected(null)
                            // }}
                >
                    <div class="infowindow">
                        <img className="blob-to-image" src={selected['data_object']['photo']} alt='object'></img>
                        <h1>{selected['data_object']['name']}</h1>
                        <h3 id="desc">{selected['data_object']['description']}</h3>
                        <audio controls autoPlay>
                            <source src={selected['data_object']['audio_file']} type="audio/mpeg"/>
                        </audio>
                    </div>
                </InfoWindowF>) : null}

        </GoogleMap>
    </div>
}

export default React.memo(MyComponent)

