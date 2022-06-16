import Image from "next/image";
import Logo from "../public/images/logo.png";
import { useState, useEffect } from "react";
import { 
    Grid, 
    GridItem, 
    Button,   
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, 
    Box
  } from "@chakra-ui/react";
  
const LoadingScreen = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF";
    })
    return (
        <div>
            <Box marginTop="150px">
                <Box>
                    <h1 id="loading-logo-text">Money Watcher</h1>
                </Box>
                <div style={{marginTop: "150px"}}> 
                    <div style={{margin: "auto", width: "fit-content"}}>
                        <div className="loader"></div>
                    </div>
                    
                </div>
               
            </Box>
        </div>
    );
}

export default LoadingScreen;