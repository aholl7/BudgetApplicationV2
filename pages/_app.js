
import "../styles/globals.css";
import React, { useEffect, useState} from "react"
import theme from '../js/theme';
import { ColorModeScript, LightMode } from '@chakra-ui/react';
import { ChakraProvider} from "@chakra-ui/react";
import { AuthProvider } from "../authentication/AuthContext";
//import dynamic from 'next/dynamic'

function MyApp({ Component, pageProps }) {

 
  if(!pageProps.protected){
    return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    )

  }else{
    
    return (
    
    <AuthProvider>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
    
  )
  }
  
}

export default MyApp;
