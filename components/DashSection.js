import { db, auth } from "../js/firebase.js";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import LoadingScreen from "../components/LoadingScreen";
import InformationTable from "../components/InformationTable";
import AddModal from "../components/AddModal";
import StatisticsSection from "./StatisticsSection.js";
const DashSection = (props) => {
    return(
        <Box>
            <h1 
                style={{
                color: "#0ACF83", 
                fontSize: "38px", 
                fontWeight: "bold",
                marginTop: "35px"
                }}
            >
                {props.type === "Expenses" ?  "EXPENSES" : props.type === "Income" ? "INCOME" : "" }
                
            </h1>
            <StatisticsSection uid={props.uid} type={props.type}/>
            <InformationTable uid={props.uid} type={props.type}/>
            <AddModal uid={props.uid} type={props.type}/>
            
        </Box>

    );
                
}

export default DashSection;