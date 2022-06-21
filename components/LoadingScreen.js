import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
  
const LoadingScreen = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#FFFFFF";
    })
    return (
        <Box>
            <Box marginTop="150px">
                <Box>
                    <h1 id="loading-logo-text">Money Watcher</h1>
                </Box>
                <Box style={{marginTop: "150px"}}> 
                    <Box style={{margin: "auto", width: "fit-content"}}>
                        <Box className="loader"></Box>
                    </Box>
                    
                </Box>
               
            </Box>
        </Box>
    );
}

export default LoadingScreen;