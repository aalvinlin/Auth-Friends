import React, { useState, useEffect } from "react";
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

    // useEffect(() => {


    // }, friends);

    if (isLoading && !errorMessage)
        {
            return (
                <div>
                    <p className="loading">Loading information...</p>
                </div>
            )
        }

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
            { friends.map(friendData => {

                let dividerColor = "dividerColor" + ((friendData.id % 3) + 1);

                return (
                    <div key={friendData.id} className="friendEntry">
                        <p>{friendData.name} (age {friendData.age})</p>
                        <p>{friendData.email}</p>
                        <hr className={dividerColor} />
                    </div>
                    )
            })}
        </div>
    )

}

export default FriendsList;