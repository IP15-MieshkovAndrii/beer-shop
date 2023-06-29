import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/productContext";
import { FilterProvider } from "./context/filterContext";
import { CartProvider } from "./context/cartContext";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Auth0Provider
    domain="dev-l6pj7psbt0dd6cc5.us.auth0.com"
    clientId="H7idAd4SHvjrZ1jjpe0B9z09wTLrmJCs"
    redirect_uri="window.location.origin" >
        <AppProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </AppProvider>
    </Auth0Provider>
);


reportWebVitals();
