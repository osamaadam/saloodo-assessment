import "./App.scss";
import Register from "./components/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import CreateParcel from "./components/CreateParcel";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";

function App() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const accessToken = useAppSelector(
    (state: RootState) => state.user.accessToken
  );

  useEffect(() => {
    if (isLoggedIn) {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      });
    }
  }, [isLoggedIn]);

  return (
    <main className="flex min-h-screen flex-row">
      <Sidebar />
      <section className="w-full p-4">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="signup"
            element={isLoggedIn ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="parcels/create"
            element={isLoggedIn ? <CreateParcel /> : <Navigate to="/login" />}
          />
        </Routes>
      </section>
    </main>
  );
}

export default App;
