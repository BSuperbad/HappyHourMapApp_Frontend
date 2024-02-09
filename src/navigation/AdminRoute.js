import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";

/** "Higher-Order Component" for admin routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

const AdminRoute = ({ element }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  console.debug(
      "AdminRoute",
      "currentUser=", currentUser,
  );

  if (!currentUser.isAdmin) {
    return (
      <div>
        
        <Navigate to="/" />
      </div>
    );
  }

  return element;
}

export default AdminRoute;
