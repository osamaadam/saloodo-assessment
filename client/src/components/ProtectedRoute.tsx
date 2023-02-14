import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
