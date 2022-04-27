import {API} from '../backend';
import axios from 'axios';


export const login = async (user) => {
    try {
        const response = await axios.post(`${API}/login`, user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
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
