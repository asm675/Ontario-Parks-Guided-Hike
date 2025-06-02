// Login Page

import React, { useState } from 'react';
import './admin.css';
import {Link, Route, useNavigate} from "react-router-dom";



const Login = () => {

    const [fields, setFields] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const validate = (e) => {
        const input = e.target.name;
        const val = e.target.value;
        console.log(e.currentTarget.value);
        setFields((prev) => {
            return {...prev, [input]: val};
        });
    };

    const reRoute = () => {
        if (fields.username === "admin" && fields.password === "Myguidedhike123!") {
            navigate('/Admin');
        } else {
            if (fields.username !== "admin") {
                alert("Incorrect Username")
            } else if (fields.password !== "Myguidedhike123!") {
                alert("Incorrect Password")

            } else {
                alert("Incorrect Username and Password");
            }
        }
    };

    return (
        <div className="login">
            <div class='container-login'>
                <form>
                    <h2>Login</h2>
                    <div class="row">
                        <h4>Username</h4>
                        <input type="text" id="username" name="username" onChange={validate}/>
                    </div>
                    <div class="row">
                        <h4>Password</h4>
                        <input type="password" id="password" name="password" onChange={validate}/>
                    </div>
                    <div class="row">
                        <button onClick={reRoute} > Submit </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;