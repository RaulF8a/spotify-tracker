import express, { Application, Router } from "express";
import path from 'path';
import cors from 'cors';
import { AllowOriginsMiddleware } from "./middlewares/allow-origins.middleware";

interface ServerOptions {
    port: number;
    routes: Router;
    publicPath?: string;
}

export class Server {
    public readonly app: Application;
    private readonly port: number;
    private readonly routes: Router;
    private readonly publicPath: string;
    private serverListener?: any;

    constructor({ port, publicPath='public', routes }: ServerOptions) {
        this.app = express();
        this.port = port;
        this.routes = routes;
        this.publicPath = publicPath;
    }

    async start() {
        this.app.use( express.json() ); // raw
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
        this.app.use( cors(
            {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            }
        ) );

        //* Public Folder
        this.app.use( express.static( this.publicPath ) );

        //* Routes
        this.app.use( this.routes );

        //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
        // this.app.get('*', (req, res) => {
        //     const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
        //     res.sendFile(indexPath);
        // });


        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }

    public close() {
        this.serverListener?.close();
    }
}

