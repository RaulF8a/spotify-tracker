import { RouteObject, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login, Home, Callback } from "../pages";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/callback",
        element: <Callback />,
    },
];

const router = createBrowserRouter(routes);

export const AppRouter = () => {

    return <RouterProvider router={ router }/>
};
