import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css";
import Logo from "../public/images/logo.png";
import { useEffect } from "react";
import HomeImage from "../public/images/homeImage.png";
import { 
  Grid, 
  GridItem, 
  Button,
  Box
} from "@chakra-ui/react";
import { auth } from "../js/firebase.js";

const Home = () => {
  const openSignUp = (e) => {
    e.preventDefault();
    const url = "/signup";
    window.location.href = url;
  }
  const openLogin = (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if (user && user.emailVerified) {
      const url = "/dashboard";
      window.location.href = url;
    } else {
      const url = "/login";
      window.location.href = url;
    }
  }
  useEffect(()=>{
    //document.body.style.backgroundColor = "#221266";
  },[]);
  return (
    <Box>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Box bgGradient='linear(to-l, #7928CA, #221266)' height="100vh">
        <Grid templateColumns="repeat(3, 1fr)" gap={0} >
          <GridItem colSpan={1} display="flex" marginTop={{base:"8px", md: "20px"}}>
            <Box display={{base: "none", md: "block"}}>
              <Image src={Logo} width={120} height={45} style={{marginTop: "1px"}}/>
            </Box>
            <Box marginLeft={{base: "10px", md: "-30px"}}>
              <h1 id="logo-text">Money Watcher</h1>
            </Box>
            
          </GridItem>

          <GridItem colSpan={2} marginTop="20px" textAlign="right">
              <Button 
                color="#FFFFFF"
                width="110px"
                height="40px"
                variant="link"
                _hover={{ color: "#0ACF83"}}
                marginRight= "10px"
                onClick={(e) => openLogin(e)}
              >
                Login
              </Button>
              <Button 
                color="#FFFFFF"
                bg="#0ACF83"
                variant="link"
                width="110px"
                height="40px"
                _hover={{ color: "#0ACF83", bg: "#FFFFFF"}}
                marginRight={{base: "0px", md: "100px"}}
                onClick={(e) => openSignUp(e)}
              >
                Sign Up
              </Button>
          </GridItem>

        </Grid>
        
        <Box 
          style={{
            width: "90%", 
            marginLeft: "auto", 
            marginRight: "auto"
          }}
        >
          <Grid templateColumns="repeat(2, 1fr)" gap={1}>
            <GridItem w="100%" colSpan={{base: "2", md:"1"}} marginTop={{base: "100px", md: "170px"}}>
              <h1 
                style={{
                  color: "#0ACF83", 
                  fontSize: "38px", 
                  fontWeight: "bold"
                }}
              >
                Budget Your Money At Ease
              </h1>
              <p 
                style={{
                  fontSize: "24px", 
                  color: "white", 
                  marginTop: "20px"
                }}
              >
                Enjoy the ability to budget your money without any hassle. College can be difficult so Money Watcher is here to not add anymore hardship for you.
              </p>
              
              <Button 
                color="#FFFFFF"
                bg="#0ACF83"
                width="70%"
                _hover={{ color: "#0ACF83", bg: "#FFFFFF"}}
                marginTop="20px"
                onClick={(e) => openSignUp(e)}
              >
                Start Budgeting Today
              </Button>
              
              
            </GridItem>
            <GridItem w="100%" textAlign="center" marginTop="80px" display={{base: "none", md: "block"}}>
              <Image src={HomeImage} height={404} width={435} />
              
            </GridItem>
          </Grid>
          
        </Box>
      </Box>
        
      </main>
      
    
    </Box>
  )
}

export default Home;