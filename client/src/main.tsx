import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import axios from "axios";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
