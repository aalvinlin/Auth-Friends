import React, { useState, useHistory } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const DeleteFriend = (props) => {

    const initialFriendData = {
        name: ""
    }

    const [friendData, setFriendData] = useState(initialFriendData);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setFriendData({...friendData, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("trying to delete friend with", friendData.name);

        // query database to get ID number of friend to delete
        axiosWithAuth()
        .get("friends")
        .then(response => {
            console.log("Getting available friends to delete:", response);

            let allFriends = response.data;
            let friendToDelete = allFriends.filter(friendDataFromDb => friendDataFromDb.name === friendData.name)[0];

            console.log("Friend found:", friendToDelete.id);
            
            // if friend found, make another axiosWithAuth call to delete friend
            if (friendToDelete)
            {
                axiosWithAuth()
                .delete("friends/" + friendToDelete.id, parseInt(friendToDelete.id))
    
                .then (response => {
                    console.log(friendData.name + " deleted:", response);
                    // redirect user to friend list to be able to see that the deletion was successful
                    props.history.push("/friends");
                })
    
                .catch (error => {
                    console.log("Could not delete friend. Error:", error);
                    setErrorMessage("Could not delete friend.");
                })
            }

        })
        .catch(error => {
            console.log("error from server:", error);
            setErrorMessage("Could not access server.")
        })

    }

    return (
        <form name="deleteFriend" className="deleteFriendForm">

            <label htmlFor="name">Name:
                <input type="text" name="name" value={friendData.name} onChange={handleChange}  className="dividerColor1"/>
            </label>

            <button name="submit" onClick={handleSubmit}>&#9679; Delete Friend &#9679;</button>

            <p className="formError">{errorMessage}</p>
        </form>
    )

}

export default DeleteFriend;