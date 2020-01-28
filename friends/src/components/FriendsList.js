import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {

        axiosWithAuth()
            .get("friends")
            .then(response => {
                console.log("response from server:", response);
            })
            .catch(error => {
                console.log("error from server:", error);
                setErrorMessage("Could not access server.")
            })

    }, []);

    useEffect(() => {


    }, friends);

    if (errorMessage)
        {
            return (
                <div>
                    <p className="serverAcessError">Could not access server.</p>
                </div>
            )
        }

    if (friends.length === 0)
        {
            return (

                <div>
                    <h1>Your Friends</h1>
                    <h2>No friends found.</h2>
                </div>
            )
        }

    return (
        <div>
            <h1>Your Friends</h1>
            <h2>These are your friends:</h2>
        </div>
    )

}

export default FriendsList;