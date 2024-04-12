import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services/user.service";


export class UserRoutes {
    static get routes(): Router {
        const router = Router();
        
        const service = new UserService();
        const controller = new UserController(service);

        router.get('/artists', controller.getTopArtists);
        router.get('/tracks', controller.getTopTracks);
        router.get('/player', controller.getCurrentPlaying);

        return router;
    }
}