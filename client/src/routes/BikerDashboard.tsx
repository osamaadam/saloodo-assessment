import BikerDashboard from "../components/BikerDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const BikerDashboardRoute = () => (
  <ProtectedRoute>
    <BikerDashboard />
  </ProtectedRoute>
);

export default BikerDashboardRoute;
