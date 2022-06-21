import { Box } from "@chakra-ui/react";
import InformationTable from "../components/InformationTable";
import AddModal from "../components/AddModal";
import StatisticsSection from "./StatisticsSection.js";
import Calculation from "../components/Calculation";

const DashSection = (props) => {
    return(
        <Box>
            
            {props.type === "Expenses" || props.type === "Income" ?
                (
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
                ) : (
                    
                    <Calculation uid={props.uid} type={props.type}/>
                )

            }
            
            
        </Box>

    );
                
}

export default DashSection;