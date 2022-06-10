import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    ControlBoxOptions,
    Box
  } from '@chakra-ui/react';
  import Statistics from './Statistics';
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

  const StatisticsSection = (props) => {
    const [monthly, setMonthly] = useState(0);
    const [semester, setSemester] = useState(0);
    const [yearly, setYearly] = useState(0);
    const getData = () => {

        if(props.type === "Expenses"){
            const que = query(collection(db, "Expenses"), where("uid", "==", props.uid));
            
            const unsub = onSnapshot(que, (querySnapshot) => {
                setMonthly(0);
                setSemester(0);
                setYearly(0);
                querySnapshot.forEach((doc) => {
                    if(doc.data().frequency === "Once"){
                        setMonthly(monthly += parseFloat(doc.data().amount));
                        setSemester(semester += (parseFloat(doc.data().amount)));
                        setYearly(yearly += (parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Monthly"){
                        setMonthly(monthly += parseFloat(doc.data().amount));
                        setSemester(semester += (4 * parseFloat(doc.data().amount)));
                        setYearly(yearly += (8 * parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Semester"){
                        setSemester(semester += parseFloat(doc.data().amount));
                        setYearly(yearly += (2 * parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Academic Year"){
                        setYearly(yearly += parseFloat(doc.data().amount));
                    }
                })
                
            })
        }else{
            const que = query(collection(db, "Income"), where("uid", "==", props.uid));
            const unsub = onSnapshot(que, (querySnapshot) => {
                setMonthly(0);
                setSemester(0);
                setYearly(0);
                querySnapshot.forEach((doc) => {
                    if(doc.data().frequency === "Once"){
                        setMonthly(monthly += parseFloat(doc.data().amount));
                        setSemester(semester += (parseFloat(doc.data().amount)));
                        setYearly(yearly += (parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Monthly"){
                        setMonthly(monthly += parseFloat(doc.data().amount));
                        setSemester(semester += (4 * parseFloat(doc.data().amount)));
                        setYearly(yearly += (8 * parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Semester"){
                        setSemester(semester += parseFloat(doc.data().amount));
                        setYearly(yearly += (2 * parseFloat(doc.data().amount)));
                    }else if(doc.data().frequency === "Academic Year"){
                        setYearly(yearly += parseFloat(doc.data().amount));
                    }
                    
                })
                
            })
        }
    }
    useEffect(() => {
        getData();
    }, [])
      return (
        <Box 
            bgColor="#FFFFFF" 
            borderRadius="5px" 
            border="2px solid #EDF2F7" 
            p={4}
            marginTop="20px"
        >
            <StatGroup>
                <Statistics type={props.type} frequency={"Monthly"} data={monthly}/><br />
                <Statistics type={props.type} frequency={"Semester"} data={semester}/><br />
                <Statistics type={props.type} frequency={"Academic Year"} data={yearly}/><br />
            </StatGroup>
        </Box>
        
      );
  }

  export default StatisticsSection;