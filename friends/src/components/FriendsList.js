import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const FriendsList = () => {

    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {

        axiosWithAuth()
            .get("friends")
            .then(response => {
                console.log("friends retrieved from server:", response);
                setFriends(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("error from server:", error);
                setErrorMessage("Could not access server.")
            })

    }, []);

    if (isLoading || errorMessage)
        {
            return (
                <div>
                    {isLoading && !errorMessage ? <p className="loading">Loading information...</p> : ""}
                    {errorMessage ? <p className="serverAcessError">{errorMessage}</p> : ""}
                </div>
            )
        }

    return (
        <div>
            <h1>Your Friends</h1>
            <hr className="dividerColor1" />
            { friends.length === 0 ?
                <h2>No friends found.</h2>
                :
            friends.map((friendData, positionInList) => {

                let dividerColor = "dividerColor" + ((positionInList % 3) + 1);

                return (
                    <div key={friendData.id} className="friendEntry">
                        <p>{friendData.name} (age {friendData.age})</p>
                        <p>{friendData.email}</p>
                        <hr className={dividerColor} />
                    </div>
                    )
            })}

            <Link to="friends/add">
                <h2>Add a new Friend</h2>
            </Link>
        </div>
    )

}

export default FriendsList;