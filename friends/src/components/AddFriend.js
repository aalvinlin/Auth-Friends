import React, { useState, useHistory } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const AddFriend = (props) => {

    const initialFriendData = {
        id: 0,
        name: "",
        age: "",
        email: ""
    }

    const [friendData, setFriendData] = useState(initialFriendData);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setFriendData({...friendData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let friendId = Date.now();

        console.log("trying to add friend with", friendData.name, friendData.age, friendData.email, friendId);

        axiosWithAuth()
            .post("friends/", friendData)

            .then (response => {
                console.log("Friend added:", response);
                // redirect user to friend list to be able to see that the update was successful
                props.history.push("/friends");
            })

            .catch (error => {
                console.log("Could not add friend. Error:", error);
                setErrorMessage("Could not add friend.");
            })
    }

    return (
        <form name="addFriend" className="addFriendForm">

            <label htmlFor="name">Name:
                <input type="text" name="name" value={friendData.name} onChange={handleChange}  className="dividerColor1"/>
            </label>

            <label htmlFor="age">Age:
                <input type="text" name="age" value={friendData.age} onChange={handleChange}  className="dividerColor2"/>
            </label>

            <label htmlFor="email">Email:
                <input type="text" name="email" value={friendData.email} onChange={handleChange}  className="dividerColor3"/>
            </label>

            <button name="submit" onClick={handleSubmit}>&#9679; Add Friend &#9679;</button>

            <p className="formError">{errorMessage}</p>
        </form>
    )

}

export default AddFriend;