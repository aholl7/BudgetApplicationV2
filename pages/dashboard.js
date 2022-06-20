import Head from "next/head"
import { useState, useEffect } from "react";
import { db, auth } from "../js/firebase.js";
import {onAuthStateChanged} from "firebase/auth";
import {
    getDoc,
    doc,
  } from  "firebase/firestore";
import { 
    Grid, 
    GridItem, 
    Button,
    Box,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import LoadingScreen from "../components/LoadingScreen";
import DashSection from "../components/DashSection";

const Home = () => {
    const [userInfo, setUserInfo] = useState({uid: "", firstName: "", lastName: "", email: ""})
    const [loading, setLoading] = useState(true);
    
  

  const getUserInfo = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //console.log(docSnap.data())
        setUserInfo({uid: uid, firstName: docSnap.data().firstName, lastName: docSnap.data().lastName, email: docSnap.data().email})
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        window.alert("No such document!");
      }
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          getUserInfo(uid);
        } else {
          // User is signed out
          // ...
        }
      });
  },[]);
  if(loading == true){
      return (
          <LoadingScreen />
      )
  }else{
    document.body.style.backgroundColor = "#221266";
    return (
        <Box>
        <Head>
            <title>Dashboard</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main style={{position: "relative"}}>
            {/*
            <Grid templateColumns="repeat(3, 1fr)" gap={0}>
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
                    bg="#0ACF83"
                    variant="link"
                    width="110px"
                    height="40px"
                    _hover={{ color: "#0ACF83", bg: "#FFFFFF"}}
                    marginRight={{base: "0px", md: "100px"}}
                    onClick={(e) => signOut(e)}
                >
                    Sign Out
                </Button>
            </GridItem>

    </Grid>*/}
            <NavBar auth={auth}/>
            <Box>
            
            </Box>
            <Box 
                style={{
                    width: "90%", 
                    marginLeft: "auto", 
                    marginRight: "auto",
                }}
            >
                <h1 
                    style={{
                    color: "#0ACF83", 
                    fontSize: "38px", 
                    fontWeight: "bold",
                    marginTop: "35px"
                    }}
                >
                    Welcome, {userInfo.firstName}!
                </h1>
                <DashSection uid={userInfo.uid} type={"Difference"}/>
                <DashSection uid={userInfo.uid} type={"Expenses"}/>
                <DashSection uid={userInfo.uid} type={"Income"}/>
                <Box paddingBottom="80px"></Box>  
            
            </Box>
            
        </main>
        
        
        
        </Box>
    )
    }
}

export default Home;

