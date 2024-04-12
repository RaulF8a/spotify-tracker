import axios from "axios";

export const spotifyApi = axios.create({
    baseURL: 'http://localhost:3000/api/',
});
