import {API} from '../backend';
// import axios from 'axios';

export const login = async (user) => {
    await fetch(`${API}/login`, {
        method : "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        console.log(error)
    })
}

export const authenticate = (data) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
    }
}

export const isAuthenticated = () => {
    if(typeof window == "undefined"){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return false;
    }
}
