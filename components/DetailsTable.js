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
    Text
  } from "@chakra-ui/react";
  import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
  import { useDisclosure } from '@chakra-ui/react'
  import EditModal from "./EditModal.js";
  import DeleteAlert from "./DeleteAlert.js"


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
                        
                    }else if(doc.data().frequency === "Yearly"){
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
                        
                    }else if(doc.data().frequency === "Yearly"){
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
        
        
    })
      return (
        <Box>
            <Box 
                bgColor={
                    props.type === "Expenses" && expenses.length === 0 ||
                    props.type === "Income" && income.length === 0 ? 
                    "#FFFFFF" : ""
                }
            >
                <h1 
                    style={{
                    color: "#0ACF83", 
                    fontSize: "38px", 
                    fontWeight: "bold",
                    marginTop: "55px"
                    }}
                >
                    {props.type === "Expenses" ? "EXPENSES" : 
                     props.type === "Income" ? "INCOME" : 
                     props.type === "Totals" ?  "TOTALS" : ""
                    }
                    
                </h1>

            <TableContainer width="100%" border="1px solid lightgrey" borderRadius="5px" borderBottomRightRadius="5px" marginTop="30px">
                
                <Table variant='simple' bgColor="#FFFFFF" size="lg">
                {props.type === "Expenses" && expenses.length === 0 ||
                 props.type === "Income" && income.length === 0 &&
                    <TableCaption bgColor="#FFFFFF">There are no records to display</TableCaption>
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
        
        
            
        </Box>
      );
  }

export default DetailsTable;