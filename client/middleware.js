import { RedirectToSignIn, useUser, useOrganization } from "@clerk/clerk-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute({ requireOrg = false }) {
  const { isSignedIn } = useUser(); 
  const location = useLocation();

  if (!isSignedIn) {
    return <Navigate to='/signin' />;
  }


  return <Outlet />;
}
