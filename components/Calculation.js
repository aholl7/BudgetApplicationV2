import { StatGroup, Box, Text, Grid, GridItem } from '@chakra-ui/react';
import StatisticsCard from './Statistics';
import { db } from "../js/firebase.js";
import { useState, useEffect } from "react";
import { 
    collection, 
    query, 
    where, 
    onSnapshot
} from "firebase/firestore";

  const Calculation = (props) => {
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
                    m += parseFloat(doc.data().amount)/4;
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount)*2;
                }else if(doc.data().frequency === "Academic Year"){
                    m += parseFloat(doc.data().amount)/8;
                    s += parseFloat(doc.data().amount)/2;
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
                    m += parseFloat(doc.data().amount)/4;
                    s += parseFloat(doc.data().amount);
                    y += parseFloat(doc.data().amount)*2;
                }else if(doc.data().frequency === "Academic Year"){
                    m += parseFloat(doc.data().amount)/8;
                    s += parseFloat(doc.data().amount)/2;
                    y += parseFloat(doc.data().amount);
                }
            })
            setMonthlyInc(m);
            setSemesterInc(s);
            setYearlyInc(y);
        })
    
    }
    const getData = () => {
        getExpenses();
        getIncome();
            
    }
    useEffect(() => {
        getData();
    }, [])
      return (
        <Box
            marginTop="20px"
        >
           
           <Grid templateColumns='repeat(3, 1fr)' gap={6} >
            <GridItem w='80%'>
                <StatisticsCard type={"Difference"} frequency={"Monthly"} data={monthlyInc - monthlyExp}/>
            </GridItem>
            <GridItem w='80%'>
                <StatisticsCard type={"Difference"} frequency={"Semester"} data={semesterInc - semesterExp}/>
            </GridItem>
            <GridItem w='80%'>
                <StatisticsCard type={"Difference"} frequency={"Academic Year"} data={yearlyInc - yearlyExp}/>
            </GridItem>
           </Grid>
            
        </Box>
        
      );
  }

  export default Calculation;