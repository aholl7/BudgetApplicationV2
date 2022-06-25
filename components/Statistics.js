import {
    Box,
    Text,
    Flex, 
    Icon
} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { TbArrowsLeftRight } from "react-icons/tb";
import { GiPayMoney, GiReceiveMoney} from "react-icons/gi";

  const StatisticsCard = (props) => {
        var frequency;
        if(props.frequency === "Academic Year"){
            frequency = "School Year"
        }else{
            frequency = props.frequency;
        }
        var isNegative = props.data < 0 ? true : false;
        var title = frequency + " " + props.type;
        const amount = props.data;
        
       
        var formattedAmount = amount.toFixed(2);
        var formattedAmount = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        
        
      return (
        <Box 
            bgGradient={
                isNegative && props.type === "Difference" ? "linear(to-l, red.500, red.400)" : 
                !isNegative && props.type === "Difference" ?  
                props.data > 0  ? "linear(to-l, green.500, green.400)" : "linear(to-l, yellow.500, yellow.400)" :
                ""
            }
            height={{base: "100px", md: "150px", lg: "100px"}} 
            borderRadius="10px"    
            width="100%"
            boxShadow={props.type === "Difference" ? "0px 0.1px 1px 0px rgba(0, 0, 0, 0.5)" : ""}
        >
            <Flex marginLeft="20px">
                
                {props.type === "Expenses" && (
                    <Box marginTop="35px">
                        <Icon as={GiPayMoney} color={props.color} height="40px" width="40px"/>
                    </Box>
                )}
                {props.type === "Income" && (
                    <Box marginTop="35px">
                        <Icon as={GiReceiveMoney} color={props.color} height="40px" width="40px"/>
                    </Box>
                )}
                
                
                
                <Box marginLeft="20px">
                    <Text 
                        fontSize="md" 
                        fontWeight="bold" 
                        marginTop="20px"
                        color={props.type === "Difference" ? "white" : props.color}
                    >
                        {title}
                    </Text>
                    <Flex>
                        {isNegative && props.type === "Difference" &&
                            <TriangleDownIcon height="20px" width="20px" color="white" marginTop="10px"/>
                        } 

                        {!isNegative && props.type === "Difference" && props.data === 0 &&
                            <Icon as={TbArrowsLeftRight} height="20px" width="20px" color="white" marginTop="10px"/>
                          
                        } 

                        {!isNegative && props.type === "Difference" && props.data > 0 &&
                            <TriangleUpIcon height="20px" width="20px" color="white" marginTop="10px"/>
                        }  
                        <Text
                            fontWeight="bold"
                            fontSize="26px" 
                            marginLeft={props.type==="Difference" ? "10px" : ""}
                            color={props.type === "Difference" ? "white" : props.color}
                        >
                                ${formattedAmount}
                        </Text>
                    </Flex>
                    

                </Box>
            </Flex>

            
        </Box>
      );
  }

  export default StatisticsCard;