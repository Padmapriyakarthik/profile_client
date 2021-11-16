import axios from 'axios';

const BASE_URL = 'https://profileserve.herokuapp.com';

export const login = (email,password)=>{
    return axios
    .post(`${BASE_URL}/login`,{email,password})
    .then((res)=>res.data).catch((error)=>(error.response.data))
}

export const signup=(name,email,password)=>{
    return axios
    .post(`${BASE_URL}/register`,{name,email,password})
    .then((res)=>res.data).catch((error)=>(error.response.data));
}


export const updateuser=(dob,gender,mobile,token)=>{
    return axios
    .post(`${BASE_URL}/updateinfo`,{dob,gender,mobile},{
        headers:{
            authorization:token
        }
    })
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const getuser=(token)=>{
    return axios
    .get(`${BASE_URL}/getinfo`,
    {
        headers:{
            authorization:token
        }
    }
    )
    .then((res)=>res.data).catch((error)=>(error.response.data));
}
