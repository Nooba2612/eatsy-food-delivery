import React, { useCallback } from "react";
import { RouterProvider } from "react-router-dom";
import router from "@router/router";
import { number } from "prop-types";

console.log(router);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
