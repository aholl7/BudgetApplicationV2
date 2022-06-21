import "../styles/globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../Authentication/AuthContext"
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
    
  )
}

export default MyApp;
