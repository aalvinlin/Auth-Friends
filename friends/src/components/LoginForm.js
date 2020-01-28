import React, { useState, useHistory } from "react";
import axios from "axios";

const LoginForm = (props) => {

    const initialData = {
        username: "",
        password: ""
    }

    const [userData, setUserData] = useState(initialData);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submitted with", userData.username, userData.password);

        axios.post("http://localhost:5000/api/login", userData)

            .then (response => {
                console.log("Logged in successfully:", response);

                // store token for authenticated access
                localStorage.setItem("token", response.data.payload);
                props.history.push("friends");
            })

            .catch (error => {
                console.log("Could not login. Error:", error);
                setErrorMessage("Username and/or password incorrect.");
            })
    }

    return (
        <form name="loginForm" className="loginForm">

            <label htmlFor="username">Username:
                <input type="text" name="username" value={userData.username} onChange={handleChange}  className="dividerColor1"/>
            </label>

            <label htmlFor="password">Password:
                <input type="password" name="password" value={userData.password} onChange={handleChange}  className="dividerColor2"/>
            </label>

            <button name="submit" onClick={handleSubmit}>&#9679; Log in &#9679;</button>

            <p className="formError">{errorMessage}</p>
        </form>
    )

}

export default LoginForm;