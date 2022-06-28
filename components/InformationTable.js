import { db, auth } from "../js/firebase.js";
import { useState, useEffect, useRef } from "react";
import {getAdditionalUserInfo, onAuthStateChanged} from "firebase/auth";
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    onSnapshot
} from "firebase/firestore";
import { 
    Grid, 
    GridItem, 
    Button,
    Flex,
    Spacer,
    Text,
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from "@chakra-ui/react";
  import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
  import { useDisclosure } from '@chakra-ui/react'
  import AddModal from "./AddModal.js";
  import EditModal from "./EditModal.js";
  import DeleteAlert from "./DeleteAlert.js"


const InformationTable = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [selectedElem, setSelectedElem] = useState(null);
    const [selectedElemName, setSelectedElemName] = useState(null);
    const [selectedElemType, setSelectedElemType] = useState(null);
    const [selectedElemFrequency, setSelectedElemFrequency] = useState(null);
    const [selectedElemAmount, setSelectedElemAmount] = useState(null);
    const [selectedDelElem, setSelectedDelElem] = useState(null);
    const { 
        isOpen: isOpen, 
        onOpen: onOpen, 
        onClose: onClose 
    } = useDisclosure();
    const { 
        isOpen: isOpen2, 
        onOpen: onOpen2, 
        onClose: onClose2
    } = useDisclosure()
    const getData = () => {

        if(props.type === "Expenses"){
            const que = query(collection(db, "Expenses"), where("uid", "==", props.uid));
            
            const unsub = onSnapshot(que, (querySnapshot) => {
                const array = [];
                querySnapshot.forEach((doc) => {
                    array.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
                console.log(props.uid);
                setExpenses(array);
            })
        }else{
            const que = query(collection(db, "Income"), where("uid", "==", props.uid));
            
            const unsub = onSnapshot(que, (querySnapshot) => {
                const array = [];
                querySnapshot.forEach((doc) => {
                    array.push({
                        id: doc.id,
                        ...doc.data()
                    });
                })
                setIncome(array);
            })
        }
    }
    useEffect(() => {
        getData();
        
        
    }, [isOpen, selectedElem, selectedElemAmount, selectedElemFrequency, selectedElemName, selectedElemType])
      return (
        <Box
            borderRadius="5px" 
            boxShadow="0px 0.5px 1px 0px rgba(0, 0, 0, 0.5)"
            marginTop="20px"
            backgroundColor={props.bg}
            
        >
            <Box paddingTop="15px" p={4}>
                <Flex>
                    <Box>
                        <Text 
                            fontSize='xl' 
                            fontWeight="bold" 
                            color={props.color}
                        >
                            {props.type}
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <AddModal 
                            uid={props.uid} 
                            type={props.type}
                            bg={props.bg} 
                            color={props.color}
                            colorMode={props.colorMode}
                        />
                    </Box>
                
                </Flex>
            </Box>
            
        <Box 
            
           
        >
                
            <TableContainer 
                width="100%" 
                borderRadius="5px" 
                height="392px"
                overflowY="auto"
            >
                <Table variant='simple' size="lg">
                {props.type === "Expenses" && expenses.length === 0 &&
                    <TableCaption >There are no records to display</TableCaption>
                }
                {props.type === "Income" && income.length === 0 &&
                    <TableCaption>There are no records to display</TableCaption>
                }
                
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        
                        
                        <Th>Frequency</Th>
                        <Th>Amount</Th>
                        
                        
                    </Tr>
                    </Thead>
                    <Tbody >
                        {expenses.map((val, id) => {
                            const amount = parseFloat(val.amount);
                            var formattedAmount = amount.toFixed(2);
                            var formattedAmount = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return(
                                
                                <Tr key={id}>
                                    <Td fontWeight="bold">{val.expense}</Td>
                                    <Td>{val.frequency}</Td>
                                    <Td>${formattedAmount}</Td>
                                    <Td borderTop="1px solid #EDF2F7">
                                        <EditIcon  
                                            _hover={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedElem(val.id);
                                                setSelectedElemName(val.expense);
                                                setSelectedElemType(val.expenseType);
                                                setSelectedElemFrequency(val.frequency);
                                                setSelectedElemAmount(formattedAmount);
                                                onOpen();
                                            }}
                                        />
                                    </Td>
                                    <Td borderTop="1px solid #EDF2F7">
                                        <DeleteIcon
                                            _hover={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedDelElem(val.id);
                                                onOpen2();
                                            }}
                                        />
                                    </Td>
                                </Tr>
                                

                            );
                        })}
                        {income.map((val, id) => {
                            const amount = parseFloat(val.amount);
                            var formattedAmount = amount.toFixed(2);
                            var formattedAmount = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return(
                                
                                <Tr key={id}>
                                    <Td fontWeight="bold">{val.income}</Td>
                                    <Td>{val.frequency}</Td>
                                    <Td>${formattedAmount}</Td>
                                    <Td borderTop="1px solid #EDF2F7">
                                        <EditIcon  
                                            _hover={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedElem(val.id);
                                                setSelectedElemName(val.income);
                                                setSelectedElemFrequency(val.frequency);
                                                setSelectedElemAmount(formattedAmount);
                                                onOpen();
                                            }}
                                        />
                                    </Td>
                                    <Td borderTop="1px solid #EDF2F7">
                                        <DeleteIcon
                                            _hover={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedDelElem(val.id);
                                                onOpen2();
                                            }}

                                        />
                                    </Td>
                                    
                                </Tr>
                                

                            );
                        })}
                    </Tbody>
                    
                </Table>
            </TableContainer>
        </Box>
        
        {isOpen === true && (
            <EditModal 
                isOpen={isOpen} 
                onClose={onClose} 
                type={props.type} 
                uid={props.uid} 
                compId={selectedElem}
                compName={selectedElemName}
                compType={selectedElemType}
                compFrequency={selectedElemFrequency}
                compAmount={selectedElemAmount}

            />

        )}
        {isOpen2 === true && (
            <DeleteAlert
                isOpen={isOpen2} 
                onClose={onClose2} 
                type={props.type} 
                uid={props.uid} 
                compId={selectedDelElem}
                

            />

        )}
            
        </Box>
      );
  }

export default InformationTable;