import { db, auth } from "../js/firebase.js";
import { useState, useEffect, useRef } from "react";
import { 
    collection, 
    query, 
    where, 
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

const DetailsTable = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [income, setIncome] = useState([]);
    const [monthly, setMonthly] = useState(0);
    const [semester, setSemester] = useState(0);
    const [yearly, setYearly] = useState(0);
    const [monthlyExp, setMonthlyExp] = useState(0);
    const [semesterExp, setSemesterExp] = useState(0);
    const [yearlyExp, setYearlyExp] = useState(0);
    const [monthlyInc, setMonthlyInc] = useState(0);
    const [semesterInc, setSemesterInc] = useState(0);
    const [yearlyInc, setYearlyInc] = useState(0);

    const getExpenses = () => {
        const que = query(collection(db, "Expenses"), where("uid", "==", props.uid));
            
        const unsub = onSnapshot(que, (querySnapshot) => {
            var m = 0;
            var s = 0;
            var y  = 0;
            querySnapshot.forEach((doc) => {
                if(doc.data().frequency === "Once"){
                    m += parseFloat(doc.data().amount);
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount);
                }else if(doc.data().frequency === "Monthly"){
                    m += parseFloat(doc.data().amount);
                    s += 4 * parseFloat(doc.data().amount);
                    y += 8 * parseFloat(doc.data().amount);
                    
                }else if(doc.data().frequency === "Semester"){
                    m += parseFloat((parseFloat(doc.data().amount)/4).toFixed(2));
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount)*2;
                }else if(doc.data().frequency === "Academic Year"){
                    m += parseFloat((parseFloat(doc.data().amount)/8).toFixed(2));
                    s += parseFloat((parseFloat(doc.data().amount)/2).toFixed(2));
                    y += parseFloat(doc.data().amount);
                }
            })
                
                
                setMonthlyExp(m);
                setSemesterExp(s);
                setYearlyExp(y);
                
                
        })

    }
    const getIncome = () => {
        const que = query(collection(db, "Income"), where("uid", "==", props.uid));
        const unsub = onSnapshot(que, (querySnapshot) => {
            var m = 0;
            var s = 0;
            var y  = 0;
            querySnapshot.forEach((doc) => {
                if(doc.data().frequency === "Once"){
                    m += parseFloat(doc.data().amount);
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount);
                }else if(doc.data().frequency === "Monthly"){
                    m += parseFloat(doc.data().amount);
                    s += 4 * parseFloat(doc.data().amount);
                    y += 8 * parseFloat(doc.data().amount);
                    
                }else if(doc.data().frequency === "Semester"){
                    m += parseFloat((parseFloat(doc.data().amount)/4).toFixed(2));
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount)*2;
                }else if(doc.data().frequency === "Academic Year"){
                    m += parseFloat((parseFloat(doc.data().amount)/8).toFixed(2));
                    s += parseFloat((parseFloat(doc.data().amount)/2).toFixed(2));
                    y += parseFloat(doc.data().amount);
                }
            
            })

            
                setMonthlyInc(m);
                setSemesterInc(s);
                setYearlyInc(y);
                
        })
    }

    const getData = () => {

        if(props.type === "Expenses"){
            const que = query(collection(db, "Expenses"), where("uid", "==", props.uid));
            
            const unsub = onSnapshot(que, (querySnapshot) => {
                const array = [];
                var m = 0;
                var s = 0;
                var y  = 0;
                querySnapshot.forEach((doc) => {
                    if(doc.data().frequency === "Once"){
                        m += parseFloat(doc.data().amount);
                        s += parseFloat(doc.data().amount);
                        y += parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat(doc.data().amount),
                            semester: parseFloat(doc.data().amount),
                            yearly: parseFloat(doc.data().amount),
                            ...doc.data()
                        });
                        
                    } else if(doc.data().frequency === "Monthly"){
                        m += parseFloat(doc.data().amount);
                        s += 4 * parseFloat(doc.data().amount);
                        y += 8 * parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat(doc.data().amount),
                            semester: parseFloat(doc.data().amount)*4,
                            yearly: parseFloat(doc.data().amount)*8,
                            ...doc.data()
                        });
                        
                    }else if(doc.data().frequency === "Semester"){
                       
                        
                        m += parseFloat((parseFloat(doc.data().amount)/4).toFixed(2));
                        s += parseFloat(doc.data().amount);
                        y += parseFloat(doc.data().amount)*2;

                        array.push({
                            id: doc.id,
                            monthly: parseFloat((parseFloat(doc.data().amount)/4).toFixed(2)),
                            semester: parseFloat(doc.data().amount),
                            yearly: parseFloat(doc.data().amount)*2,
                            ...doc.data()
                        });
                        
                    }else if(doc.data().frequency === "Academic Year"){
                        m += parseFloat((parseFloat(doc.data().amount)/8).toFixed(2));
                        s += parseFloat((parseFloat(doc.data().amount)/2).toFixed(2));
                        y += parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat((parseFloat(doc.data().amount)/8).toFixed(2)),
                            semester: parseFloat((parseFloat(doc.data().amount)/2).toFixed(2)),
                            yearly: parseFloat(doc.data().amount),
                            ...doc.data()
                        });
                    }

                    
                    
                })
                
                
                var monthlyAmount = m.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var semesterAmount = s.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var yearlyAmount = y.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                setExpenses(array);
                setMonthly(monthlyAmount);
                setSemester(semesterAmount);
                setYearly(yearlyAmount);
            })
        }else if(props.type === "Income"){
            const que = query(collection(db, "Income"), where("uid", "==", props.uid));
            
            const unsub = onSnapshot(que, (querySnapshot) => {
                const array = [];
                var m = 0;
                var s = 0;
                var y  = 0;
                querySnapshot.forEach((doc) => {
                    if(doc.data().frequency === "Once"){
                        m += parseFloat(doc.data().amount);
                        s += parseFloat(doc.data().amount);
                        y += parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat(doc.data().amount),
                            semester: parseFloat(doc.data().amount),
                            yearly: parseFloat(doc.data().amount),
                            ...doc.data()
                        });
                        
                    } else if(doc.data().frequency === "Monthly"){
                        m += parseFloat(doc.data().amount);
                        s += 4 * parseFloat(doc.data().amount);
                        y += 8 * parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat(doc.data().amount),
                            semester: parseFloat(doc.data().amount)*4,
                            yearly: parseFloat(doc.data().amount)*8,
                            ...doc.data()
                        });
                        
                    }else if(doc.data().frequency === "Semester"){
                       
                        
                        m += parseFloat((parseFloat(doc.data().amount)/4).toFixed(2));
                        s += parseFloat(doc.data().amount);
                        y += parseFloat(doc.data().amount)*2;

                        array.push({
                            id: doc.id,
                            monthly: parseFloat((parseFloat(doc.data().amount)/4).toFixed(2)),
                            semester: parseFloat(doc.data().amount),
                            yearly: parseFloat(doc.data().amount)*2,
                            ...doc.data()
                        });
                        
                    }else if(doc.data().frequency === "Academic Year"){
                        m += parseFloat((parseFloat(doc.data().amount)/8).toFixed(2));
                        s += parseFloat((parseFloat(doc.data().amount)/2).toFixed(2));
                        y += parseFloat(doc.data().amount);

                        array.push({
                            id: doc.id,
                            monthly: parseFloat((parseFloat(doc.data().amount)/8).toFixed(2)),
                            semester: parseFloat((parseFloat(doc.data().amount)/2).toFixed(2)),
                            yearly: parseFloat(doc.data().amount),
                            ...doc.data()
                        });
                    }
                    
                })
                
                var monthlyAmount = m.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var semesterAmount = s.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                var yearlyAmount = y.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                
                setIncome(array);
                setMonthly(monthlyAmount);
                setSemester(semesterAmount);
                setYearly(yearlyAmount);
            })
        }else{
            getExpenses();
            getIncome();
            
        }
    }

    
    useEffect(() => {
        getData();
        
        
    }, [])
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
                    
                
                </Flex>
            </Box>
            <TableContainer 
                width="100%" 
                borderRadius="5px" 
                
            >
                
                <Table variant='simple' bgColor={props.bg} size="lg">
                    {props.type === "Expenses" && expenses.length === 0 &&
                        <TableCaption >There are no records to display</TableCaption>
                    }
                    {props.type === "Income" && income.length === 0 &&
                        <TableCaption>There are no records to display</TableCaption>
                    }
                
                
                    <Thead>
                    <Tr>
                        {props.type !== "Totals" ? (
                            <Th>Name</Th>
                        ) : (
                            <Th></Th>
                        )}
                        <Th>Per Month</Th>
                        
                        
                        <Th>Per Semester</Th>
                        <Th>Per Academic Year</Th>
                        
                        
                    </Tr>
                    </Thead>
                    <Tbody>
                        {expenses.map((val, id) => {
                            var monthlyAmount = val.monthly;
                            var semesterAmount = val.semester;
                            var yearlyAmount = val.yearly;
                            
                            var monthlyAmount = monthlyAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var semesterAmount = semesterAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var yearlyAmount = yearlyAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return(
                                
                                <Tr key={id}>
                                    <Td fontWeight="bold">{val.expense}</Td>
                                    <Td>${monthlyAmount}</Td>
                                    <Td>${semesterAmount}</Td>
                                    <Td>${yearlyAmount}</Td>
                                </Tr>
                                

                            );
                        })}
                        {expenses.length > 0 && props.type === "Expenses" && (
                            <Tr color="#E53E3E" fontWeight="bold">
                                <Td>Total {props.type}</Td>
                                <Td>${monthly}</Td>
                                <Td>${semester}</Td>
                                <Td>${yearly}</Td>
                            </Tr>
                        )}
                        {income.map((val, id) => {
                            var monthlyAmount = val.monthly;
                            var semesterAmount = val.semester;
                            var yearlyAmount = val.yearly;
                            
                            var monthlyAmount = monthlyAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var semesterAmount = semesterAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            var yearlyAmount = yearlyAmount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return(
                                
                                <Tr key={id}>
                                    <Td fontWeight="bold">{val.income}</Td>
                                    <Td>${monthlyAmount}</Td>
                                    <Td>${semesterAmount}</Td>
                                    <Td>${yearlyAmount}</Td>
                                    
                                    
                                </Tr>
                                

                            );
                        })}
                        {income.length > 0 && props.type === "Income" && (
                            <Tr color="#38A169" fontWeight="bold">
                                <Td>Total {props.type}</Td>
                                <Td>${monthly}</Td>
                                <Td>${semester}</Td>
                                <Td>${yearly}</Td>
                            </Tr>
                        )}
                        {props.type === "Totals" && (
                            <>{/*#38A169*/}
                                <Tr>
                                    <Td fontWeight="bold">Total Expenses</Td>
                                    <Td>${monthlyExp.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                    <Td>${semesterExp.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                    <Td>${yearlyExp.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                </Tr>
                                
                                <Tr>
                                    <Td fontWeight="bold">Total Income</Td>
                                    <Td>${monthlyInc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                    <Td>${semesterInc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                    <Td>${yearlyInc.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Td>
                                </Tr>
                                <Tr fontWeight="bold">
                                    <Td>Difference</Td>
                                    <Td
                                        color={
                                            (monthlyInc - monthlyExp) < 0? "#E53E3E" : "#38A169"
                                        }
                                    >
                                        ${(monthlyInc - monthlyExp).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Td>
                                    <Td
                                        color={
                                            (monthlyInc - monthlyExp) < 0? "#E53E3E" : "#38A169"
                                        }
                                    >
                                        ${(semesterInc - semesterExp).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Td>
                                    <Td
                                        color={
                                            (monthlyInc - monthlyExp) < 0? "#E53E3E" : "#38A169"
                                        }
                                    >
                                        ${(yearlyInc - yearlyExp).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </Td>
                                </Tr>

                            </>
                        )

                        }
                    </Tbody>
                    
                </Table>
            </TableContainer>
        </Box>
        
        
            
        
      );
  }

export default DetailsTable;