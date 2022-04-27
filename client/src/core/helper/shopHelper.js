import {API} from "../../backend";
const axios = require('axios');

export const getAllProducts = async () => {
    try{
        const response = await axios.get(`${API}/products`);
        return response.data;
    }catch(error){
        console.log(error)
    }
}

