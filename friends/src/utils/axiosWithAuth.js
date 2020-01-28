import axios from "axios";

export const axiosWithAuth = () => {

    console.log("localstorage has", localStorage);

    return axios.create({
        baseURL: "http://localhost:5000/api/",
        headers: { authorization: localStorage.getItem("token")}
    });
};