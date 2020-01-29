import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const EditFriend = (props) => {

    const [existingFriends, setExistingFriends] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const [friendData, setFriendData] = useState(initialFriendData);

    useEffect(() => {

        axiosWithAuth()
            .get("friends")
            .then(response => {
                console.log("friends retrieved from server:", response);
                setExistingFriends(response.data);

                if (response.data.length > 0)
                    { setFriendData(response.data[0]); }
                    
                setIsLoading(false);
            })
            .catch(error => {
                console.log("error from server:", error);
                setErrorMessage("Could not access server.")
            })

    }, []);

    const initialFriendData = {
        id: 0,
        name: "",
        age: "",
        email: ""
    }

    const handleChange = (event) => {

        // if the dropdown menu is changed to a different option, change all input fields.
        if (event.target.type === "select-one")
            {
                let friendChosen = existingFriends.filter(friend => friend.name === event.target.value)[0];

                // overwrite all other form values with values for selected friend
                setFriendData(friendChosen);
            }
        else
            { setFriendData({...friendData, [event.target.name]: event.target.value }); }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let friendId = Date.now();

        console.log("trying to edit friend with", friendData.name, friendData.age, friendData.email, friendId);

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

    console.log(friendData, "is friendData");
    console.log(existingFriends, "is friends");

    if (!friendData)
        { return <h2>Loading friend data...</h2>}

    return (
        <form name="addFriend" className="addFriendForm">

            <label htmlFor="name">Name:
                <select name="name" value={friendData.name} onChange={handleChange}  className="dividerColor1">
                    { existingFriends.map(friend => <option value={friend.name} key={"option" + friend.id}>{friend.name}</option>) }
                </select>
            </label>

            <label htmlFor="age">Age:
                <input type="text" name="age" value={friendData.age} onChange={handleChange}  className="dividerColor2"/>
            </label>

            <label htmlFor="email">Email:
                <input type="text" name="email" value={friendData.email} onChange={handleChange}  className="dividerColor3"/>
            </label>

            <button name="submit" onClick={handleSubmit}>&#9679; Edit Friend &#9679;</button>

            <p className="formError">{errorMessage}</p>
        </form>
    )

}

export default EditFriend;