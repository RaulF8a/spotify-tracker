
import { Router } from "express";
import { AuthController } from "./controller";
import { generateCodeVerifier } from "../helpers";
import { AuthService } from "../services/auth.service";


export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        
        const verifier = generateCodeVerifier(128);
        const service = new AuthService(verifier);
        
        const controller = new AuthController(service);

        router.get('/token', controller.getToken);
        router.get('/profile', controller.getProfile);

        return router;
    }
}
