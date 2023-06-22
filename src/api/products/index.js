import { DB_URL } from "../../Constants";
import axios from "axios";

const headers = {
    'Cache-Control': 'no-cache',
    'Accept-Language': 'en',
    'Content-Type': 'application/json',
};

const config = {
    headers
};


export const loadProducts = ()=>{
    return axios.get(DB_URL+'/products');
} 

export const findById = (id) =>{
    return axios.get(DB_URL+`/products/${id}`);
}

export const saveProduct = (values,actions) =>{
    return axios.post(DB_URL+`/products`,values,headers);
}

export const updateProduct = (values,actions) =>{
    return axios.put(DB_URL+`/products/${values.id}`,values,headers);
}

export const patchProduct = (values) =>{
    return axios.patch(DB_URL+`/products/${values.id}`,values,headers);
}

export const deleteProduct = (id) => {
    return axios.delete(DB_URL+`/products/${id}`);
}

