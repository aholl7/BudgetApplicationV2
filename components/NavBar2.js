import { useState, useEffect, useRef } from "react";
import { HamburgerIcon } from '@chakra-ui/icons';
import { AiFillHome, AiFillSignal, AiOutlineRight } from 'react-icons/ai';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Flex, 
    Spacer, 
    Box, 
    Button,  
    IconButton, 
    useDisclosure,
  } from '@chakra-ui/react';
import Image from "next/image"
import Logo from "../public/images/logo.png";

const NavBar = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [documentTitle, setDocumentTitle] = useState(null);
    const btnRef = useRef();
    const signOut = (e) => {
        e.preventDefault();
        props.auth.signOut();
        const url = "/login";
        window.location.href = url;
    }

    const viewDashboard = (e) => {
        e.preventDefault();
        const url = "/dashboard";
        window.location.href = url;
    }

    const viewOverview = (e) => {
        e.preventDefault();
        const url = "/detailed-overview";
        window.location.href = url;
    }

    useEffect(() =>{
        setDocumentTitle(document.title);
    }, [documentTitle])

    
    return (
        <Box>

        
            <Box display={{base: "none", sm: "block"}}>
                    
                <Box marginTop="20px">
                    <h1 id={props.colorMode === "light" ? "logo-text-purple" : "logo-text-green-main"}>Money Watcher</h1>
                </Box>
                <Box marginTop="50px" marginLeft="10px">
                    <Box 
                        width="100%" 
                        borderRight={
                            documentTitle === "Dashboard" ?
                                props.colorMode === "light" ?  
                                    "3px solid #221266" : "3px solid #0ACF83"
                                : ""
                        }
                >
                            <Button 
                                color={
                                    documentTitle === "Dashboard" ?
                                    props.colorMode === "light" ?  
                                        "#221266" : "#0ACF83"
                                    : props.color
                                }
                                height="40px"
                                variant="link"
                                _hover={{ 
                                    color: props.colorMode === "light" ?  
                                    "#221266" : "#0ACF83"
                                }}
                                justifyContent="flex-start"
                                onClick={(e) => viewDashboard(e)}
                                leftIcon={<AiFillHome />}
                                fontSize="18px"
                                fontWeight="medium"
                            >
                                Dashboard
                            </Button>
                    </Box>
                    <Box 
                        width="100%" 
                        marginTop="25px" 
                        borderRight={
                            documentTitle === "Overview" ?
                                props.colorMode === "light" ?  
                                    "3px solid #221266" : "3px solid #0ACF83"
                                : ""
                        }
                    >
                            
                            <Button 
                                color={
                                    documentTitle === "Overview" ?
                                    props.colorMode === "light" ?  
                                        "#221266" : "#0ACF83"
                                    : props.color
                                }
                                height="40px"
                                variant="link"
                                _hover={{ 
                                    color: props.colorMode === "light" ?  
                                    "#221266" : "#0ACF83"
                                }}
                                justifyContent="flex-start"
                                onClick={(e) => viewOverview(e)}
                                leftIcon={<AiFillSignal />}
                                fontSize="18px"
                                fontWeight="medium"
                            >
                            Overview
                        </Button>
                    </Box>
                    <Box width="100%" marginTop="25px" borderRight="">
                            
                            <Button 
                                color={props.color}
                                height="40px"
                                variant="link"
                                _hover={{ 
                                    color: props.colorMode === "light" ?  
                                    "#221266" : "#0ACF83"
                                }}
                                justifyContent="flex-start"
                                onClick={(e) => signOut(e)}
                                leftIcon={<AiOutlineRight />}
                                fontSize="18px"
                                fontWeight="medium"
                            >
                            Sign Out
                        </Button>
                        
                    </Box>

                </Box>
            </Box>
            <Box display={{base: "block", sm: "none"}} width="100%">
                <Flex marginTop="30px" width="96%">
                    <Flex>
                        <Box display={{base: "none", md: "block"}}>
                            <Image src={Logo} width={120} height={45} style={{marginTop: "1px"}}/>
                        </Box>
                        <Box marginLeft={{base: "10px", md: "-30px"}}>
                            <h1 id="logo-text">Money Watcher</h1>
                        </Box>
                    </Flex>
                    <Spacer />
                    <Box>
                    <IconButton
                            color='#0ACF83'
                            aria-label='Search database'
                            icon={<HamburgerIcon />}
                            ref={btnRef}
                            onClick={onOpen}
                            variant="outlined"
                            fontSize="28px"
                        />
                    <Drawer
                        isOpen={isOpen}
                        placement='right'
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        size={"full"}
                        
                    >
                        <DrawerOverlay />
                        <DrawerContent bgColor="#0ACF83" >
                            
                        <DrawerCloseButton icon={<HamburgerIcon />} fontSize="14px" marginTop="1px"/>
                        <DrawerHeader>
                            <Box marginLeft={{base: "20px", md: "30px"}}>
                                <h1 id="logo-text-white">Money Watcher</h1>
                            </Box>
                        </DrawerHeader>

                        <DrawerBody textAlign="center" bgColor="#0ACF83"  marginTop="30px">
                            <Button 
                                color="#FFFFFF"
                                fontSize="26px"
                                variant="link"
                                _hover={{ color: "#0ACF83"}}
                                onClick={(e) => {
                                    if(documentTitle != "Dashboard"){
                                        viewDashboard(e)
                                    }
                                    
                                }}
                            >
                                Dashboard
                            </Button><br />
                            <Button 
                                color="#FFFFFF"
                                fontSize="26px"
                                variant="link"
                                marginTop="30px"
                                _hover={{ color: "#0ACF83"}}
                                onClick={(e) => {
                                    if(documentTitle != "Overview"){
                                        viewOverview(e)
                                    }
                                }}
                            >
                                Overview
                            </Button><br />
                            <Button 
                                color="#FFFFFF"
                                fontSize="26px"
                                variant="link"
                                _hover={{ color: "#0ACF83", bg: "#FFFFFF"}}
                                marginTop="30px"
                                onClick={(e) => signOut(e)}
                            >
                                Sign Out
                            </Button>
                        
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                            </Button>
                            <Button colorScheme='blue'>Save</Button>
                        </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                    </Box> 
                    
                </Flex>
                
            </Box>
            

        </Box>
    ); 
}

export default NavBar;