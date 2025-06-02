/***
 *
 * Admin Page Responsible for creating, editing and deleting POI's made by the Park Naturalist.
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/
import './admin.css';
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrashAlt, faX} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';


const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
}

const Admin = () => {
    const navigate = useNavigate();
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [getData, setGetData] = useState([]);
    const [position, setPosition] = useState({});
    const [poi_data_id, setPoi_data_id] = useState(0);
    let name = "";
    let _id2 = "";
    let _id = "";
    let _id3 = "";

    // TODO: Change this URL to localhost if you want to test backend with frontend locally, else change to deployed backend URL
    const URL = `https://my-guided-hike.herokuapp.com/`;
    const [audio, setAudio] = useState(null);
    const [pic, setPic] = useState(null);
    const [updateAudio, setUpdateAudio] = useState(null);
    const [updatePic, setUpdatePic] = useState(null);
    const [fields, setFields] = useState({
        name: "",
        POI_DATA_Type: "",
        description: "",
        audio_file: "",
        expiration_date: "",
        uploaded_on: "",
        reoccurrence: "",
        photo: "",
        isActive: "",
        isAudioPresent: "",
        POI_DATA_id: "",
    });

    const [preFilled, setPreFilled] = useState({
        POI_DATA_id: "",
        name: "",
        POI_DATA_Type: "",
        description: "",
        audio_file: "",
        expiration_date: "",
        uploaded_on: "",
        reoccurrence: "",
        photo: "",
        isActive: "",
        isAudioPresent: "",
        poi_data: [],
    });

    const [editPos, setEditPos] = useState({})

    const config2 = {
        headers: {
            Accept: 'application/json', 'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        axios.get(URL, config2).then(res => {
            setGetData(res.data)
        })
    }, [])

    // This useEffect is for getting the user location autofilled in the form
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setPosition({
                latitude: position.coords.latitude, longitude: position.coords.longitude,
            });
        }, (error) => {
            console.error(error);
        });
    }, []);

    const renderDetailsButton = (params) => {
        return (<div>
            <button onClick={(e) => {
                showEditPoi(e, params.row.name, params.row.latitude, params.row.longitude)
            }}><FontAwesomeIcon icon={faPenToSquare} id="clickable"/></button>
            <button onClick={(e) => {
                handleDelete(e, params.row.id, params.row.name)
            }}><FontAwesomeIcon icon={faTrashAlt} id="clickable"/></button>
        </div>)
    }

    const cols = [{field: "id", headerName: "ID", width: 20, type: "number"}, {
        field: "longitude",
        headerName: "Longitude",
        width: 110,
        type: "number"
    }, {
        field: "latitude", headerName: "Latitude", type: "number", width: 110,
    }, {
        field: "name", headerName: "Name", width: 130,
    }, {
        field: "type", headerName: "Type", width: 110,
    }, {
        field: "expiration_date", headerName: "Expiration Date", width: 150,
    }, {
        field: "description", headerName: "Description", width: 200,
    }, {
        field: "edit", headerName: "Edit", width: 150, renderCell: renderDetailsButton,
    },];

    // Axios calls to delete the point of interest
    async function handleDelete(e, poi_id, name) {
        e.preventDefault();
        axios({
            method: "delete", url: URL + `delete_poi/${poi_id}/`
        }).then(r => {
            console.log(r.status);
            get_id(name)
        }).catch(err => {
            console.log("call #1", err)
        });
    }

    async function get_id(name) {
        await axios({
            method: "GET", url: URL + 'get_id/' + name + '/', headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            console.log("call #2 success", r);
            setPoi_data_id(r.data.results[0]['POI_DATA_id']);
            _id3 = r.data.results[0]['POI_DATA_id'];
            delete_poi_data(_id3);
        }).catch(err => {
            console.log("call 2 err", err)
        });
    }

    async function delete_poi_data(id) {
        axios({
            method: "delete", url: URL + `delete_poi_data/${id}/`
        }).then(r => {
            console.log(r.status);
            alert("Deleted!");
            navigate(0);
        }).catch(err => {
            console.log("call 3", err)
        });

    }

    const new_rows = getData.map(x => {
        return {
            id: x.POI_id,
            latitude: x.latitude,
            longitude: x.longitude,
            name: x['data_object']['name'],
            type: x['data_object']['POI_DATA_Type'],
            expiration_date: x['data_object']['expiration_date'],
            description: x['data_object']['description'], // edit: "test",
            edit: <div>
                <button onClick={showEditPoi}><FontAwesomeIcon icon={faPenToSquare} id="clickable"/></button>
                <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashAlt} id="clickable"/></button>
            </div>,
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        await first_post_req();
    };

    // Handles the request to create a new point of interest data
    async function first_post_req() {
        fields.uploaded_on = date;
        // Audio Present Check
        fields.isAudioPresent = !!fields.audio_file;
        fields.isActive = date < fields.expiration_date;
        fields.audio_file = audio;
        fields.photo = pic;

        const formData = new FormData();
        formData.append("name", fields.name);
        formData.append("POI_DATA_Type", fields.POI_DATA_Type);
        formData.append("description", fields.description);
        formData.append("audio_file", fields.audio_file);
        formData.append("reoccurrence", fields.reoccurrence);
        formData.append("uploaded_on", fields.uploaded_on);
        formData.append("photo", fields.photo);
        formData.append("isActive", fields.isActive);
        formData.append("expiration_date", fields.expiration_date);
        formData.append("isAudioPresent", fields.isAudioPresent);
        name = fields.name;
        // Axios first post call to store the poi_data.
        axios({
            method: "POST", url: URL + 'add_poi_data/', data: formData, headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then(function (r) {
            console.log("successful 1", r);
            setTimeout(() => {
                get_req();
            }, 1000);
        })
            .catch(err => {
                console.log("error 1: ", err);
            })
    }
    async function get_req() {
        console.log("name is", name);
        await axios({
            method: "GET", url: URL + 'get_id/' + name + '/', headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            console.log("successful 2", r);
            setPoi_data_id(r.data.results[0]['POI_DATA_id']);
            _id = r.data.results[0]['POI_DATA_id'];
            second_post_req();
        }).catch(err => {
            console.log("error 2: ", err)
        });
    }

    async function second_post_req() {
        console.log("position is, ", position);
        position['data_object'] = _id;
        console.log("position is, ", position);
        await axios.post(URL + 'add_poi/', position, config)
            .then(r => {
                console.log("successful 3", r);
                alert("Point Added!");
                navigate(0);
            })
            .catch(err => {
                console.log("error 3:", err);
            })
    }

    const handleChange = (e) => {
        const input = e.target.name;
        const val = e.target.value;
        console.log(e.currentTarget.value);
        setFields((prev) => {
            return {...prev, [input]: val};
        });
    };

    // Handler for the Image
    function handleImage(e) {
        console.log(e.target.files);
        setPic(e.target.files[0])
    }

    // Handler for the Audio
    function handleAudio(e) {
        console.log(e.target.files);
        setAudio(e.target.files[0])
    }

    // Handle Close Button
    function handleClose(e) {
        e.preventDefault();
        document.getElementById('edit_post').style.display = 'none';
    }

    const handleEditChange = (e) => {
        const input = e.target.name;
        const val = e.target.value;
        console.log(e.currentTarget.value);
        console.log("input is", input);
        console.log("val is", val);
        setPreFilled((prev) => {
            return {...prev, [input]: val};
        });
    };

    // Fetches the data to be edited and prefills the form with that data
    function showEditPoi(e, name, lat, long) {
        e.preventDefault();
        setEditPos({latitude: lat, longitude: long})
        // axios call to fetch the item.
        axios.get(URL + 'get_id/' + name + '/').then(r => {
            console.log(r.data.results[0].poi_data[0].POI_id);
            setPreFilled(r.data.results[0]);
            setEditPos({latitude: lat, longitude: long, id: r.data.results[0].poi_data[0].POI_id})
            _id2 = r.data.results[0].poi_data[0].POI_id;
        }).catch(err => {
            console.log("error 2: ", err)
        });

        document.getElementById('edit_post').style.display = 'block';
    }

    // Handles the request to submit an edit to the point of interest data
    const handleEditSubmit = async (e) => {
        console.log(e);
        e.preventDefault();

        if (updateAudio !== null) {
            preFilled.audio_file = updateAudio;
        }
        if (updatePic === null) {
            preFilled.photo = updatePic;
        }
        preFilled.isAudioPresent = !!preFilled.audio_file;
        preFilled.isActive = date < preFilled.expiration_date;
        // blobs
        let blob = await fetch(fields.photo).then(r => r.blob());
        let blob2 = await fetch(fields.audio_file).then(r => r.blob());

        const formEditData = new FormData();
        formEditData.append("name", preFilled.name);
        formEditData.append("POI_DATA_Type", preFilled.POI_DATA_Type);
        formEditData.append("description", preFilled.description);
        formEditData.append("audio_file", blob2);
        formEditData.append("reoccurrence", preFilled.reoccurrence);
        formEditData.append("uploaded_on", preFilled.uploaded_on);
        formEditData.append("photo", blob);
        formEditData.append("isActive", preFilled.isActive);
        formEditData.append("isAudioPresent", preFilled.isAudioPresent);
        formEditData.append("expiration_date", preFilled.expiration_date);

        await axios({
            method: "put",
            url: URL + 'edit_poi_data/' + parseInt(preFilled.POI_DATA_id) + '/',
            data: formEditData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then(res => {
            console.log(res.status);
            put_func()
        })
            .catch(err => {
                console.log(err)
            })
    }

    // Axios call to edit the point of interest
    async function put_func() {
        const editPosFormData = new FormData();
        editPosFormData.append('latitude', editPos.latitude);
        editPosFormData.append('longitude', editPos.longitude);
        await axios.put(URL + `edit_poi/` + editPos.id + '/', editPosFormData, config)
            .then(res => {
                console.log(res.status)
                alert("edit was successful");
                navigate(0);
            }).catch(err => console.log(err));
    }

    // Handler for the Image
    function handleEditImage(e) {
        console.log(e.target.files);
        setUpdatePic(e.target.files[0]);
    }

    // Handler for the Audio
    function handleEditAudio(e) {
        console.log(e.target.files);
        setUpdateAudio(e.target.files[0]);
    }

    const handleEditPos = (e) => {
        const input = e.target.name;
        const val = e.target.value;
        console.log(e.currentTarget.value);
        setEditPos((prev) => {
            return {...prev, [input]: val};
        });
    };

    // Returns JSX-HTML for the admin page

    return (

        <div>
            {/* <div class='center_title'>Admin</div> */}
            <div class='container'>
                <form onSubmit={handleSubmit} method="POST">
                    <h2>Add a Point of Interest</h2>
                    <div class="row">
                        <h4>Location</h4>
                        <input type="text" id="latitude" name="latitude" placeholder='Latitude' onChange={handleChange}
                               value={position.latitude}/>
                        <input type="text" id="longitude" name="longitude" placeholder='Longitude'
                               onChange={handleChange} value={position.longitude}/>
                    </div>
                    <div class="row">
                        <h4>Name</h4>
                        <input type="text" id="name" name="name" onChange={handleChange} value={fields.name}/>
                    </div>
                    <div class="row">
                        <h4>Expiry Date</h4>
                        <input type="date" id="expiration_date" name="expiration_date" onChange={handleChange}
                               value={fields.expiration_date}/>
                    </div>
                    <div class="row">
                        <h4>Recurrence</h4>
                        <select name="reoccurrence" id="reoccurrence" onChange={handleChange} value={fields.recurrence}>
                            <option value="none">None</option>
                            <option value="1">1 Month</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                    </div>
                    <div class="row">
                        <h4>POI Type</h4>
                        <input type="radio" id="animal" name="POI_DATA_Type" value="Animal" onChange={handleChange}/>
                        <label for="animal">Animal</label>
                        <input type="radio" id="plant" name="POI_DATA_Type" value="Plant" onChange={handleChange}/>
                        <label for="plant">Plant</label>
                        <input type="radio" id="historical" name="POI_DATA_Type" value="Historical"
                               onChange={handleChange}/>
                        <label for="historical">Historical</label>
                    </div>
                    <div class="row">
                        <h4>Audio File</h4>
                        <input type="file" id="poiFile" name="audio_file" accept="audio/mp3 audio/mp4"
                               onChange={handleAudio || null}/>
                    </div>
                    <div class="row">
                        <h4>Picture</h4>
                        <input type="file" id="poiFile" name="photo" accept="image/png, image/jpeg"
                               onChange={handleImage || null}/>
                    </div>
                    <div class="row">
                        <h4>Description</h4>
                        <textarea name="description" rows="5" onChange={handleChange}
                                  value={fields.description}></textarea>
                    </div>
                    <div class="row">
                        <h4></h4>
                        <input type="submit" value="Add POI"/>
                    </div>

                </form>
            </div>
            <div class='container1'>
                <Box sx={{
                    height: 400,
                    width: '100%',
                    boxShadow: 2,
                    border: 2,
                    borderColor: '#005813',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main', fontFamily: 'Arial',
                    }
                }}>
                    <DataGrid
                        rows={new_rows}
                        columns={cols}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        onRowSelectionModelChange={itm => console.log(itm)}
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
            <div class='container' id='edit_post'>
                <form method="POST" onSubmit={handleEditSubmit}>
                    <div className="title-form">
                        <h2>Edit a Point of Interest</h2>
                        <button id="close-btn" onClick={handleClose}><FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        </button>
                    </div>
                    <div className="row">
                        <h4>Location</h4>
                        <input type="text" id="latitude" name="latitude" placeholder='Latitude' onChange={handleEditPos}
                               value={editPos.latitude}/>
                        <input type="text" id="longitude" name="longitude" placeholder='Longitude'
                               onChange={handleEditPos} value={editPos.longitude}/>
                    </div>
                    <div className="row">
                        <h4>Name</h4>
                        <input type="text" id="name" name="name" onChange={handleEditChange} value={preFilled.name}/>
                    </div>
                    <div className="row">
                        <h4>Expiry Date</h4>
                        <input type="date" id="expiration_date" name="expiration_date" onChange={handleEditChange}
                               value={preFilled.expiration_date}/>
                    </div>
                    <div className="row">
                        <h4>Recurrence</h4>
                        <select name="reoccurrence" id="reoccurrence" onChange={handleEditChange}
                                select={preFilled.reoccurrence}>
                            <option value="none">None</option>
                            <option value="1">1 Month</option>
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                        </select>
                    </div>
                    <div className="row">
                        <h4>POI Type</h4>
                        <input type="radio" id="animal2" name="POI_DATA_Type" value="Animal"
                               onInput={handleEditChange}/>
                        <label htmlFor="animal2">Animal</label>
                        <input type="radio" id="plant2" name="POI_DATA_Type" value="Plant" onInput={handleEditChange}/>
                        <label htmlFor="plant2">Plant</label>
                        <input type="radio" id="historical2" name="POI_DATA_Type" value="Historical"
                               onInput={handleEditChange}/>
                        <label htmlFor="historical2">Historical</label>
                    </div>
                    <div className="row">
                        <h4>Audio File</h4>
                        <input type="file" id="poiFile" name="audio_file"
                               onChange={handleEditAudio}/>
                    </div>

                    <div className="row">
                        <h4>Picture</h4>
                        <input type="file" id="poiFile" name="photo"
                               onChange={handleEditImage}/>
                    </div>
                    <div className="row">
                        <h4>Description</h4>
                        <textarea name="description" rows="5" onChange={handleEditChange}
                                  value={preFilled.description}></textarea>
                    </div>
                    <div className="row">
                        <h4></h4>
                        <input type="submit" value="Edit POI"/>
                    </div>
                </form>
            </div>
        </div>);
};

export default Admin;