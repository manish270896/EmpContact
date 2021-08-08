import axios from 'axios';

export default axios.create({
    //baseURL: "http://localhost:3006/"
    //baseURL: "https://my-json-server.typicode.com/manish270896/server-api/"
    baseURL: "https://server1-api.herokuapp.com/"
})