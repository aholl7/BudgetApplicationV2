import { 
    Grid, 
    GridItem, 
    Button,
    Box,
} from "@chakra-ui/react";
import LoadingScreen from "../components/LoadingScreen";
import InformationTable from "../components/InformationTable";
import AddModal from "../components/AddModal";

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
            
            <InformationTable uid={props.uid} type={props.type}/>
            <AddModal uid={props.uid} type={props.type}/>
                
        </Box>

    );
                
}

export default DashSection;