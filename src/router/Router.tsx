import { createBrowserRouter } from "react-router-dom";
import App from "@pages/App/App.tsx";
import Home from "@pages/Home/Home.tsx";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
        ],
    },
]);

export default Router;
