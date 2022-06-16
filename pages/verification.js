import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { 
    Button, 
    Box,
} from "@chakra-ui/react"
import VerificationImage from "../public/images/verification-image.png";
import {sendEmailVerification } from "firebase/auth";
import { db, auth } from "../js/firebase.js";

const Verification = () => {
    useEffect(()=>{
      
    },[]);
    const verifyEmail = () => {
        e.preventDefault();
        sendEmailVerification(auth.currentUser).then(() => {
          // Email verification sent!
          // ...
            const url = "/verification";
            window.location.href = url;
        });
      };

      const openLogin = (e) => {
        e.preventDefault();
        const url = "/login";
        window.location.href = url;
      }
    
      
      
    return (
      <Box>
        <Head>
          <title>Verification</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          
        <Box textAlign="center" marginTop="60px">
            <Image src={VerificationImage} height={160} width={160}/>
            <h1 style={{fontWeight: "bold", fontSize:"24px"}}>A verification email was sent to your email address!</h1>
            <p style={{fontSize:"18px", marginTop: "10px", color: "grey", fontWeight: "bold"}}>Once you have verified your email, you can click login to get started.</p>
            <p style={{fontSize:"18px", color: "grey", fontWeight: "bold"}}>If you did not receive the verification email then you can resend it.</p>
            <Box marginTop="20px">
                <Box width="fit-content" margin="auto">
                    <Button 
                        color="#FFFFFF"
                        bg="#BA68C8"
                        variant="link"
                        width="200px"
                        height="40px"
                        _hover={{ color: "#FFFFFF", bg: "#BA68C8"}}
                        marginRight={{base: "5px", md: "10px"}}
                        onClick={(e) => verifyEmail(e)}
                    >
                        Resend Email
                    </Button>
                    <Button 
                        color="#FFFFFF"
                        bg="#BA68C8"
                        variant="link"
                        width="200px"
                        height="40px"
                        _hover={{ color: "#FFFFFF", bg: "BA68C8"}}
                        onClick={(e) => openLogin(e)}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
            
        </Box> 
            
          
        </main>
        
      
      </Box>
    )
  }
  //templateColumns={{base: "repeat(3, 1fr)", sm: "repeat(2, 1fr)"}}
  export default Verification;