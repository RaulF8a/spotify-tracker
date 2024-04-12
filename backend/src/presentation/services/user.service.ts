import axios, { AxiosError } from "axios";
import { CustomError } from "../../domain/errors/custom.error";

export class UserService {
    constructor( ) { }

    public async getTopArtists (token: string, limit: number = 5, time_range: string = 'medium_term') {
        const url = `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${time_range}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try{
            const { data } = await axios.get(url, {headers});
        
            return data;
        }
        catch (error) {
            const err = error as AxiosError;
            console.error(error);
            throw CustomError.internalServer(`${err}`);
        }
    };

    public async getTopTracks (token: string, limit: number = 5, time_range: string = 'medium_term') {
        const url = `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${time_range}`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try{
            const { data } = await axios.get(url, {headers});
        
            return data;
        }
        catch (error) {
            const err = error as AxiosError;
            console.error(error);
            throw CustomError.internalServer(`${err}`);
        }
    };

    public async getCurrentPlaying (token: string) {
        const url = `https://api.spotify.com/v1/me/player/currently-playing`;
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        try{
            const { data } = await axios.get(url, {headers});
        
            return data;
        }
        catch (error) {
            const err = error as AxiosError;
            console.error(error);
            throw CustomError.internalServer(`${err}`);
        }
    };
};
