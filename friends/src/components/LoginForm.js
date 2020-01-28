import React, { useState } from "react";

const LoginForm = () => {

    const initialData = {
        username: "",
        password: ""
    }

    const [userData, setUserData] = useState(initialData);

    const handleChange = (event) => {
        setUserData({...userData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("submitted with", userData.username, userData.password);
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
        </form>
    )

}

export default LoginForm;