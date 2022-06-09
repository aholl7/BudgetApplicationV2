import { db, auth } from "../js/firebase.js";
import { useState, useEffect } from "react";
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




const InformationTable = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
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
    }, [])
      return (
        <Box 
            bgColor={
                props.type === "Expenses" && expenses.length === 0 ||
                props.type === "Income" && income.length === 0 ? 
                "#FFFFFF" : ""
            }>
            <TableContainer width="100%" border="1px solid lightgrey" borderRadius="5px" marginTop="30px">
                <Table variant='simple' bgColor="#FFFFFF" size="lg">
                {props.type === "Expenses" && expenses.length === 0 ||
                 props.type === "Income" && income.length === 0 &&
                    <TableCaption bgColor="#FFFFFF">There are no records to display</TableCaption>
                }
                
                    <Thead>
                    <Tr>
                        <Th>Name</Th>
                        {props.type === "Expenses" && (
                            <Th>Type</Th>
                        )}
                        
                        <Th>Frequency</Th>
                        <Th>Amount</Th>
                        
                        
                    </Tr>
                    </Thead>
                    <Tbody>
                        {expenses.map((val, id) => {
                            const amount = val.amount;
                            var internationalNumberFormat = new Intl.NumberFormat('en-US')
                            var formattedAmount = internationalNumberFormat.format(amount);
                            
                            if(formattedAmount.indexOf(".") === -1){
                               formattedAmount += ".00";
                            }
                            return(
                                
                                <Tr key={id}>
                                    <Td>{val.expense}</Td>
                                    <Td>{val.expenseType}</Td>
                                    <Td>{val.frequency}</Td>
                                    <Td>${formattedAmount}</Td>
                                    <Td borderTop="1px solid #EDF2F7"><EditIcon/></Td>
                                    <Td borderTop="1px solid #EDF2F7"><DeleteIcon/></Td>
                                </Tr>
                                

                            );
                        })}
                        {income.map((val, id) => {
                            return(
                                
                                <Tr key={id}>
                                    <Td>{val.income}</Td>
                                    <Td>{val.frequency}</Td>
                                    <Td>${val.amount}</Td>
                                    <Td borderTop="1px solid #EDF2F7"><EditIcon/></Td>
                                    <Td borderTop="1px solid #EDF2F7"><DeleteIcon/></Td>
                                    
                                </Tr>
                                

                            );
                        })}
                    </Tbody>
                    
                </Table>
            </TableContainer>
        </Box>
      );
  }

export default InformationTable;