
   import { useDispatch } from "react-redux";
   import { Navigate, Outlet } from "react-router-dom";
   import { useMemo } from "react";
   import jwtDecode from "jwt-decode";
   import { handleLogin } from "../../userSlice";
   
   export const ProtectedRoute = () => {
       const dispatch = useDispatch();
   
       const isLoggedIn = useMemo(() => {
           const token = localStorage.getItem("token");
           if (token) {
               try {
                   const decoded = jwtDecode(token);
                   if (decoded.exp * 1000 < Date.now()) {
                       return false;
                   }
   
                   dispatch(handleLogin(decoded));
                   return true;
               } catch (e) {
                   return false;
               }
           }
   
           return false;
       }, []);
   
       if (!isLoggedIn) {
           return <Navigate to="/SignIn" replace />;
       }
   
       return <Outlet />;
   };      