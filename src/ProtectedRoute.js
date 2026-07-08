import { Navigate } from "react-router-dom";   //it is used to programmatically navigate to a different route. In this case, it is used to redirect unauthenticated users to the login page when they try to access protected routes.

const ProtectedRoute = ({ children }) => {    //childern is a special prop in React that allows you to pass components or elements as children to a component. In this case, it represents the component that should be rendered if the user is authenticated and allowed to access the protected route.
  const token = localStorage.getItem("token");  //retrieves the authentication token from the browser's local storage. This token is typically set when a user logs in and is used to determine if the user is authenticated.

  if (!token) {
    alert("You must login first to access this feature.");
    return <Navigate to="/login" replace />;    //replace prevents users from returning to the protected page using: the back button after being redirected to the login page.
  }

  return children;
};  

export default ProtectedRoute;
