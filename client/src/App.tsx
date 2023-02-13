import "./App.scss";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import CreateParcel from "./components/CreateParcel";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import axios from "axios";

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
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="parcels/create" element={<CreateParcel />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
