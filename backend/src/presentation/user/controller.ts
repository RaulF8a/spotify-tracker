import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { UserService } from "../services/user.service";

export class UserController {
    constructor(
        public readonly userService: UserService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: `Unknown error`})
    };

    getTopArtists = async (req: Request, res: Response) => {
        const authorization = req.header('Authorization');
        const { limit, time_range } = req.query;

        if(!authorization) {
            return res.status(400).json({ error: `Token is required` });
        }

        const token = authorization.split(' ').at(1) || '';

        try{
            const artists = await this.userService.getTopArtists(token, Number(limit), 
            time_range as string);
            
            return res.status(200).json({ artists });
        }
        catch(error){
            this.handleError(error, res);
        }
    };

    getTopTracks = async (req: Request, res: Response) => {
        const authorization = req.header('Authorization');
        const { limit, time_range } = req.query;

        if(!authorization) {
            return res.status(400).json({ error: `Token is required` });
        }

        const token = authorization.split(' ').at(1) || '';

        try{
            const tracks = await this.userService.getTopTracks(token, Number(limit), 
            time_range as string);
            
            return res.status(200).json({ tracks });
        }
        catch(error){
            this.handleError(error, res);
        }
    };

    getCurrentPlaying = async (req: Request, res: Response) => {
        const authorization = req.header('Authorization');

        if(!authorization) {
            return res.status(400).json({ error: `Token is required` });
        }

        const token = authorization.split(' ').at(1) || '';

        try{
            const currentTrack = await this.userService.getCurrentPlaying(token);
            
            return res.status(200).json({ currentTrack });
        }
        catch(error){
            this.handleError(error, res);
        }
    }

};