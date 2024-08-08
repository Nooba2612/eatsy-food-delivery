import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import store from "@store/store.js";
import App from "./App.jsx";
import { GlobalStyles } from "@components/index.js";
import { LoadingProvider } from "@contexts/loading.js";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Provider store={store}>
                <GlobalStyles>
                    <LoadingProvider>
                        <App />
                    </LoadingProvider>
                </GlobalStyles>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

reportWebVitals();
