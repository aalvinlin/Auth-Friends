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
                <input type="text" name="username" value={userData.username} onChange={handleChange} />
            </label>

            <label htmlFor="password">Password:
                <input type="password" name="password" value={userData.password} onChange={handleChange} />
            </label>

            <button name="submit" onClick={handleSubmit}>Log in</button>

            <p className="loginError">{errorMessage}</p>
        </form>
    )

}

export default LoginForm;