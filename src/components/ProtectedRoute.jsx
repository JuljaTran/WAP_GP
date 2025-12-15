import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  //Not Logged in
  if (!user?.username) {
    return <Navigate to="/login" />;
  }

  //Logged in but NO avatar -> avatar page
  if(!user.avatar && location.pathname !== "/avatar"){
    return <Navigate to="/avatar" replace />;
  }

  //Logged in + avatar
  return children;
}