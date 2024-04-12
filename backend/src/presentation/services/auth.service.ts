import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { envsAdapter } from '../../config/envs.adapter';
import { generateCodeChallenge } from '../helpers';
import { URLSearchParams } from 'url';
import { CustomError } from '../../domain/errors/custom.error';

export class AuthService {
    constructor(
        private readonly verifier: string,
    ) { }

    public async redirectToSpotifyAuth(req: Request, res: Response) {
        const challenge = await generateCodeChallenge(this.verifier);
        const scope = 'user-read-private user-read-email user-read-currently-playing user-top-read';

        const params = new URLSearchParams();
        params.append("client_id", envsAdapter.SPOTIFY_CLIENT_ID);
        params.append("response_type", "code");
        // params.append("redirect_uri", `${envsAdapter.REMOTE_URL}/api/auth/token`);
        params.append("redirect_uri", `http://localhost:5173/callback`);
        params.append("scope", scope);
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        const authURL = `https://accounts.spotify.com/authorize?${params.toString()}`;

        res.json({ authURL }); 
    };

    public async getToken(req: Request, res: Response) {
        const { code } = req.query;

        const params = new URLSearchParams();
        params.append("client_id", envsAdapter.SPOTIFY_CLIENT_ID);
        params.append("grant_type", "authorization_code");
        params.append("code", code as string);
        // params.append("redirect_uri", `${envsAdapter.REMOTE_URL}/api/auth/token`);
        params.append("redirect_uri", `http://localhost:5173/callback`);
        params.append("code_verifier", this.verifier);

        try {
            const result = await axios.post(
                "https://accounts.spotify.com/api/token",
                params.toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const { access_token } = await result.data;

            return access_token;
        }
        catch (error) {
            const err = error as AxiosError;
            
            throw CustomError.internalServer(`${err}`);
        }
    };

    public async getProfile(token: string) {
        const url = "https://api.spotify.com/v1/me";
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
