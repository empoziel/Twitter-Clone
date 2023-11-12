import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  //check the users authority
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    //watch active account states
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  //if user dont have authority redirect to main page
  if (isAuth === false) return <Navigate to={"/"} replace />;

  // if user have authority show subroute
  return <Outlet />;
};

export default ProtectedRoute;
