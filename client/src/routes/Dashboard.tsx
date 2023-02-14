import Dashboard from "../components/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const DashboardRoute = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export default DashboardRoute;
