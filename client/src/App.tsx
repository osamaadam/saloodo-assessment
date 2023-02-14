import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { lazy, Suspense, useEffect } from "react";
import { axiosInstance } from "./api";

const Login = lazy(() => import("./routes/Login"));
const Signup = lazy(() => import("./routes/Signup"));
const DashboardRoute = lazy(() => import("./routes/Dashboard"));
const BikerDashboardRoute = lazy(() => import("./routes/BikerDashboard"));
const CreateParcel = lazy(() => import("./routes/parcels/Create"));

function App() {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const accessToken = useAppSelector(
    (state: RootState) => state.user.accessToken
  );

  useEffect(() => {
    const token = accessToken;
    axiosInstance.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return () => axiosInstance.interceptors.request.clear();
  }, [accessToken]);

  return (
    <main className="flex min-h-screen flex-row">
      <Sidebar />
      <section className="w-full overflow-hidden bg-gray-100 p-4">
        <Suspense fallback={"placeholder loading state..."}>
          <Routes>
            <Route path="/" element={<DashboardRoute />} />
            <Route path="/biker" element={<BikerDashboardRoute />} />
            <Route
              path="login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="signup"
              element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
            />
            <Route path="parcels/create" element={<CreateParcel />} />
          </Routes>
        </Suspense>
      </section>
    </main>
  );
}

export default App;
