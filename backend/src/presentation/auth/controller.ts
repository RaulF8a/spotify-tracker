import { Response, Request } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { AuthService } from "../services/auth.service";

export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if( error instanceof CustomError ) {
            return res.status( error.statusCode ).json({ error: error.message })
        }

        console.log(`${error}`);
        return res.status(500).json({ error: `Unknown error`})
    };

    getToken = async (req: Request, res: Response) => {
        const { code } = req.query;

        if(!code) {
            this.authService.redirectToSpotifyAuth(req, res);

            return;
        }

        try{
            const token = await this.authService.getToken(req, res);
            
            return res.status(200).json({ token });
        }
        catch(error){
            this.handleError(error, res);
        }
    };

    getProfile = async (req: Request, res: Response) => {
        const authorization = req.header('Authorization');

        if(!authorization) {
            return res.status(400).json({ error: `Token is required` });
        }

        const token = authorization.split(' ').at(1) || '';

        try{
            const profile = await this.authService.getProfile(token);
            
            return res.status(200).json({ profile });
        }
        catch(error){
            this.handleError(error, res);
        }
    };

}
