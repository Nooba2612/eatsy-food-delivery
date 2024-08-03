import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "@store/store.js";
import { GlobalStyles } from "@components/index.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Provider store={store}>
                <GlobalStyles>
                    <App />
                </GlobalStyles>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

reportWebVitals();
