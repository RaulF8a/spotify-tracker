import { CurrentlyPlaying, Profile, TopArtists, TopTracks } from "../types";
import { spotifyApi } from "./instance";

export const redirectToSpotifyAuth = async () => {
    try{
        const { data } = await spotifyApi.get('auth/token');

        window.location.href = data.authURL;
    }
    catch(error){
        console.error(`${error}`);
    }
};

export const generateToken = async (url: string) => {
    const code = url.split('?')[1];
    console.log(code);

    try{
        const { data } = await spotifyApi.get(`auth/token?${code}`);

        return data;
    }
    catch(error){
        console.error(`${error}`);
    }
};

export const getProfile = async () => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    };

    try{
        const { data } = await spotifyApi.get<Profile>('auth/profile', config);

        return data;
    }
    catch(error){
        console.error(`${error}`);
    }
};

export const getTopArtists = async (timeRange: string = 'medium_term', limit: number = 5) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    };

    try{
        const { data } = await spotifyApi.get(
            `user/artists?time_range=${timeRange}&limit=${limit}`, 
            config
        );

        return data.artists as TopArtists;
    }
    catch(error){
        console.error(`${error}`);
    }
};

export const getTopTracks = async (timeRange: string = 'medium_term', limit: number = 5) => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    };

    try{
        const { data } = await spotifyApi.get(
            `user/tracks?time_range=${timeRange}&limit=${limit}`, 
            config
        );

        return data.tracks as TopTracks;
    }
    catch(error){
        console.error(`${error}`);
    }
};

export const getCurrentPlayback = async () => {
    let config = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    };

    try{
        const { data } = await spotifyApi.get('user/player', config);

        return data.currentTrack as CurrentlyPlaying;
    }
    catch(error){
        console.error(`${error}`);
    }
}
