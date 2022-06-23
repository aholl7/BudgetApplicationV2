import "../styles/globals.css"
import theme from '../js/theme'
import { ColorModeScript } from '@chakra-ui/react'
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../authentication/AuthContext"
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
    
  )
}

export default MyApp;
