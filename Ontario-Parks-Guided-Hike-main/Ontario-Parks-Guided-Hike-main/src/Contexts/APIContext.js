/***
 *
 *
 *
 * Authors: Ansh Malhotra, Armaan Mann, Shayaan Khan, Aabid Anas, Kowan Chan, Matt Chan, Danny Audisho
 *
 * All of the files in this directory and all subdirectories are:
 * Copyright (c) ©2023 Shayaan Khan, Aabid Anas, Matthew Chan, Ansh Malhotra, Danny Audisho, Armaan Mann, Kowan Chan | All rights reserved |
 ***/
import {createContext, useState} from "react";

const initial = {
    poi_id: "",
    poi_name: "",
    poi_description: "",
    photo: "",
    poi_type: "",
    upload_data: "",
    expiration_data: "",
    recurrence: "",
    audio_file: "",
    is_audible: "",
    is_active: ""
};

export const usePOIContext = () => {
    const [data, setData] = useState(initial);
    const [temp, setTemp] = useState("");
    return {
        data, setData, temp, setTemp
    }
}

const APIContext = createContext({
    data: initial, setData: () => {},
    temp: "", setTemp: () => {},
})

export default APIContext;