import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectionAuthorization = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return (
        children
    )
}
return (
  <Navigate to="/" />
)
}


export default ProtectionAuthorization;