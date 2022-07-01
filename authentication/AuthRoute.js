import React, { useContext } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "./AuthContext"
import { LightMode } from "@chakra-ui/react";

const AuthRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const Router = useRouter();
  if (currentUser) {
    return <>{children}</>
  } else {
    Router.push("/login")
    return <><LightMode></LightMode></>
  }
}

export default AuthRoute;