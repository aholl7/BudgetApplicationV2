import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Logo from "../public/images/logo-white.png";
import { useEffect } from "react";
import LoginImage from "../public/images/loginImage.png";
import { 
    Grid, 
    GridItem, 
    Button,   
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input, 
    Box,
    Center
} from "@chakra-ui/react"

const Login = () => {
    const openDashboard = (e) => {
        e.preventDefault();
        const url = "/dashboard";
        window.location.href = url;
    }
    
    useEffect(()=>{
      
    },[]);
    return (
      <div>
        <Head>
          <title>Login</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          <Grid templateColumns="repeat(3, 1fr)" w={{ base: "90%", sm: "98%", md: "100%" }} marginLeft="auto" marginRight="auto" gap={0}>
            <GridItem  
                colSpan={1} 
                display={{ base: "none", md: "block" }} 
                bg="#FF7262" 
                h="100vh"
            >
                <Box display="flex" marginTop="20px">
                    <Box>
                        <Image src={Logo} width={120} height={45} style={{marginTop: "1px"}}/>
                    </Box>
                    
                    <h1 id="logo-text-white">Money Watcher</h1>
                </Box>
                <Box marginLeft="38px" marginTop="50px">
                    <p
                        style={{
                            fontWeight: "bold",
                            color: "white",
                            fontSize: "25px",
                            width: "73%"
                        }}
                    >
                        We are here to give you one less thing to worry about while you are in college
                    </p>
                    <Box
                        marginTop="35px"
                        marginLeft="-20px"
                    >
                        <Image src={LoginImage} height={404} width={435} />
                    </Box>
                    
                </Box>
              
            </GridItem>
  
            <GridItem colSpan={{base: 3, md: 2}} bg = "white">
                <Box marginLeft={{base: "", sm: "130px"}}>
                    <Box marginTop="150px">
                        <h1 style={{fontSize: "25px", fontWeight: "bold"}}>Welcome Back!</h1>
                        <p style={{fontSize: "15px", fontWeight: "bold", marginTop: "10px", color: "grey", width: "70%"}}>Sign in to continue.</p>
                    </Box>
                    <form>
                        <Box marginTop="20px" width={{base: "100%", sm: "75%"}}>
                            <Box width="100%">
                                <FormControl marginTop="15px">
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input id="email" type="email" />
                                </FormControl>
                                
                                <FormControl marginTop="15px">
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Input id="password" type="password" />
                                </FormControl>
                                
                                
                            </Box>
                        </Box>
                    </form>
                    <Button 
                        color="#FFFFFF"
                        bg="#FF7262"
                        width={{base: "50%", md: "30%"}}
                        _hover={{ color: "#FFFFFF", bg: "#0ACF83"}}
                        marginTop="20px"
                        onClick={(e) => openDashboard(e)}
                    >
                        Login
                    </Button>
                    <Box fontSize="15px" fontWeight = "bold" marginTop ="20px" color="grey" >
                        <p>Don&apos;t have an account yet? <Link href="/signup"><a style={{color: "blue"}}>Sign Up</a></Link></p>
                    </Box>
                    

                </Box>
                
                
            </GridItem>
  
          </Grid>
          
          
            
          
        </main>
        
      
      </div>
    )
  }
  //templateColumns={{base: "repeat(3, 1fr)", sm: "repeat(2, 1fr)"}}
  export default Login;