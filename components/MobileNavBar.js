import { useRef } from "react";
import { HamburgerIcon, MoonIcon } from '@chakra-ui/icons';
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
    useDisclosure 
  } from '@chakra-ui/react';
import Image from "next/image"
import Logo from "../public/images/logo.png";

const NavBar = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
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


    return (
        <Box >

        
            <Box display={{base: "block", md: "none"}} width="100%">
                <Flex marginTop="30px" width="96%">
                    <Flex>
                        <Box display={{base: "none", md: "block"}}>
                            <Image src={Logo} width={120} height={45} style={{marginTop: "1px"}}/>
                        </Box>
                        <Box marginLeft={{base: "10px", md: "-30px"}}>
                            <h1 id={props.colorMode === "light" ? "logo-text-purple" : "logo-text-green-main"}>Money Watcher</h1>
                        </Box>
                    </Flex>
                    <Spacer />
                    <Box>
                        <IconButton
                            color={props.colorMode === 'light' ? 'gray.400' : 'white'}
                            icon={<MoonIcon />}
                            onClick={props.enableDark}
                            variant="outlined"
                            fontSize="20px"
                            
                        />
                    
                        <IconButton
                                color={props.colorMode === 'light' ? "#221266" : "#0ACF83"} 
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
                            <DrawerContent bgColor={props.colorMode === 'light' ? "#221266" : "#0ACF83"} >
                                
                            <DrawerCloseButton icon={<HamburgerIcon />} fontSize="14px" marginTop="1px" color={props.colorMode === 'light' ? "white" : "black"}  />
                            <DrawerHeader>
                                <Box marginLeft={{base: "20px", md: "30px"}}>
                                    <h1 id="logo-text-white">Money Watcher</h1>
                                </Box>
                            </DrawerHeader>

                            <DrawerBody textAlign="center" bgColor={props.colorMode === 'light' ? "#221266" : "#0ACF83"}   marginTop="30px">
                                <Button 
                                    color="#FFFFFF"
                                    fontSize="26px"
                                    variant="link"
                                    _hover={{ color: "#FFFFFF"}}
                                    onClick={(e) => viewDashboard(e)}
                                >
                                    Dashboard
                                </Button><br />
                                <Button 
                                    color="#FFFFFF"
                                    fontSize="26px"
                                    variant="link"
                                    marginTop="30px"
                                    _hover={{ color: "#FFFFFF"}}
                                    onClick={(e) => viewOverview(e)}
                                >
                                    Overview
                                </Button><br />
                                <Button 
                                    color="#FFFFFF"
                                    fontSize="26px"
                                    variant="link"
                                    _hover={{ color: "#FFFFFF"}}
                                    marginTop="30px"
                                    onClick={(e) => signOut(e)}
                                >
                                    Sign Out
                                </Button>
                            
                            </DrawerBody>

                            
                            </DrawerContent>
                        </Drawer>
                        </Box> 
                    
                </Flex>
                
            </Box>
            

        </Box>
    ); 
}

export default NavBar;