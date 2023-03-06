import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ( { loggedIn } ) => {
  if(loggedIn) {
    return(
      <Outlet/>
    )
  }
  return(
    <Navigate to="/"/>
  )
}
export default ProtectedRoutes