import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "@store/store.js";
import { GlobalStyles } from "@components/index.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Provider>
    </React.StrictMode>,
);

reportWebVitals();
