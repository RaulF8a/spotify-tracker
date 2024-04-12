import { envsAdapter } from "./config/envs.adapter";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
    main();
})();

async function main() {
    const server = new Server({
        port: envsAdapter.PORT,
        routes: AppRoutes.routes,
        publicPath: 'public',
    });

    server.start();
}
