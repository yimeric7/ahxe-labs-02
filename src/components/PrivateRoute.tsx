import * as React from "react";
import { useAuth } from "../firebase/AuthContext";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { currentUser } = useAuth();

  return currentUser ? <>{children}</> : <Navigate to="/" replace />;
}
