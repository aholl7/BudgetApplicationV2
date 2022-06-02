import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Logo from "../public/images/logo-white.png";
import { useEffect } from "react";
import SignUpImage from "../public/images/signUpImage.png";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    setDoc,
    doc,
  } from  "firebase/firestore";
  import { db } from "../js/firebase.js";

const SignUp = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
      } = useForm({});
      const password = watch("password");

      const submitInfo = async (data) => {
          await addDoc(collection(db, "cities"), {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          });

       /*
        try {
          const user = createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password
          ).then(() => {
            verifyEmail();
            //const ref = collection(db, "users");
            try {
              const auth = getAuth();
              const user = auth.currentUser;
              const docRef = setDoc(doc(db, "users", user.uid), {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
              });
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
        } catch (error) {
          window.alert(error.message);
        }
        auth.signOut();*/
        
      }

      

    useEffect(()=>{
    },[]);
    return (
      <div>
        <Head>
          <title>Sign Up</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          <Grid templateColumns="repeat(3, 1fr)" w={{ base: "90%", sm: "98%", md: "100%" }} marginLeft="auto" marginRight="auto" gap={0}>
            <GridItem  
                colSpan={1} 
                display={{ base: "none", md: "block" }} 
                bg="#0ACF83" 
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
                        A few clicks away from starting your budgeting today
                    </p>
                    <Box
                        marginTop="35px"
                        marginLeft="-20px"
                    >
                        <Image src={SignUpImage} height={404} width={435} />
                    </Box>
                    
                </Box>
              
            </GridItem>
  
            <GridItem colSpan={{base: 3, md: 2}} bg = "white">
                <Box marginLeft={{base: "", sm: "130px"}}>
                    <Box marginTop={{base: "20px", sm: "60px"}}>
                        <h1 style={{fontSize: "25px", fontWeight: "bold"}}>Register</h1>
                        <p style={{fontSize: "20px", fontWeight: "bold", marginTop: "30px"}}>Manage your budget with ease</p>
                        <p style={{fontSize: "15px", fontWeight: "bold", marginTop: "10px", color: "grey", width: "70%"}}>Let&apos;s get you started so that you can verify your account and begin budgeting today.</p>
                    </Box>
                    <form onSubmit={handleSubmit(submitInfo)}>
                        <Box marginTop="20px" width={{base: "100%", sm: "75%"}}>
                            <Box display="flex" width="100%">
                                <FormControl width = "49%" isInvalid={errors.firstName}>
                                    <FormLabel>First Name</FormLabel>
                                    <Input 
                                        id="firstName" 
                                        type="name" 
                                        {...register("firstName", {
                                            required: "Required Field",
                                            pattern: {
                                              value: /^[A-Z]([-']?[a-z]+)*$/,
                                              message: "Please enter valid first name",
                                            },
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.firstName && errors.firstName.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl width = "49%" marginLeft = "2%" isInvalid={errors.firstName}>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input 
                                        id="name" 
                                        type="name"
                                        {...register("lastName", {
                                            required: "Required Field",
                                            pattern: {
                                              value: /^[A-Z]([-']?[a-z]+)*$/,
                                              message: "Please enter valid last name",
                                            },
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.lastName && errors.lastName.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Box>
                            <Box width="100%">
                                <FormControl marginTop="15px" isInvalid={errors.email}>
                                    <FormLabel>Email</FormLabel>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        {...register("email", {
                                            required: "Required Field",
                                            pattern: {
                                              value: /^\S.*@\S+$/,
                                              message: "Please enter valid email address",
                                            },
                                            
                                          })}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                
                                <FormControl marginTop="15px" isInvalid={errors.password}>
                                    <FormLabel>Password</FormLabel>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        {...register("password", {
                                            required: "Required Field",
                                            minLength: {
                                              value: 6,
                                              message: "Your password must be 6 or more characters",
                                            },
                                            pattern: {
                                              value: /^(?=.*?[A-Z])(?=(.*?[a-z]){1,})(?=(.*?[0-9]){1,})(?=(.*?[+={}|:;"'<,>./#?!@$%^&*-~`()[\]_-]){1,}).{6,}$/,
                                              message:
                                                "Password must be a mixture of both uppercase and lowercase letters, a number, and a special character",
                                            },
                                          })}
                                        
                                    />
                                    <FormErrorMessage>
                                        {errors.password && errors.password.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl marginTop="15px" isInvalid={errors.repassword}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input 
                                        id="repassword" 
                                        type="password" 
                                        {...register("repassword", {
                                            required: "Required Field",
                                            validate: (value) =>
                                              value === password || "The passwords do not match",
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.repassword && errors.repassword.message}
                                    </FormErrorMessage>
                                </FormControl>

                                
                            </Box>
                        </Box>
                        <Button 
                            color="#FFFFFF"
                            bg="#0ACF83"
                            width={{base: "50%", md: "30%"}}
                            _hover={{ color: "#FFFFFF", bg: "#0ACF83"}}
                            marginTop="20px"
                            type='submit'
                        >
                            Create Account
                        </Button>
                    </form>
                    
                    <Box fontSize="15px" fontWeight = "bold" marginTop ="20px" color="grey" >
                        <p>Already have an account? <Link href="/login"><a style={{color: "blue"}}>Log In</a></Link></p>
                    </Box>
                    

                </Box>
                
                
            </GridItem>
  
          </Grid>
          
          
            
          
        </main>
        
      
      </div>
    )
  }
  export default SignUp;