import "./styles/normalize.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "@redux/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Router from "@router/Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={Router} />
        </Provider>
    </React.StrictMode>
);
