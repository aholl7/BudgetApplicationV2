import {
    StatGroup,
    Box,
    Text
} from '@chakra-ui/react';
import Statistics from './Statistics';
import { db } from "../js/firebase.js";
import { useState, useEffect } from "react";
import { 
    collection, 
    query, 
    where, 
    onSnapshot
} from "firebase/firestore";

  const StatisticsSection = (props) => {
    var type;
    if(props.type === "Expenses"){
        type = "Expense";
    }else{
        type = props.type;
    }
    const [monthly, setMonthly] = useState(0);
    const [semester, setSemester] = useState(0);
    const [yearly, setYearly] = useState(0);
    const getData = () => {

        if(props.type === "Expenses"){
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
                setMonthly(m);
                setSemester(s);
                setYearly(y);
            })
        }else{
            if(props.type === "Income"){
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
                    setMonthly(m);
                    setSemester(s);
                    setYearly(y);
                })
            }
        }
    }
    useEffect(() => {
        getData();
    }, [])
      return (
        <Box 
            bgColor={props.bg}
            borderRadius="5px" 
            boxShadow="0px 0.1px 1px 0px rgba(0, 0, 0, 0.5)"
            p={4}
            marginTop="20px"
            width={{base: "102%", md: "100%"}}
            
        >
            <Text fontSize='xl' fontWeight="bold" color={props.color}>{type} Totals</Text>
            
            <Box marginTop="30px">
                <Statistics 
                    type={props.type} 
                    frequency={"Monthly"} 
                    data={monthly} 
                    colorMode={props.colorMode}
                    bg={props.bg} 
                    color={props.color}
                /><br />
                <Statistics 
                    type={props.type} 
                    frequency={"Semester"} 
                    data={semester} 
                    colorMode={props.colorMode}
                    bg={props.bg} 
                    color={props.color}
                /><br />
                <Statistics 
                    type={props.type} 
                    frequency={"Academic Year"} 
                    data={yearly} 
                    colorMode={props.colorMode}
                    bg={props.bg} 
                    color={props.color}
                /><br />
            </Box>
        </Box>
        
      );
  }

  export default StatisticsSection;