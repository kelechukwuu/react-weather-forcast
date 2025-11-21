import axios from "axios";


const key = import.meta.env.VITE_API


const axiosCreate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

export default ((id)=> axiosCreate.get(`/v1/current.json?key=${key}&q=${id}&aqi=no`))