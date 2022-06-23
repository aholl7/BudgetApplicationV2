import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import InformationTable from "../components/InformationTable";
import AddModal from "../components/AddModal";
import StatisticsSection from "./StatisticsSection.js";
import Calculation from "../components/Calculation";

const DashSection = (props) => {
    return(
        <Box>
            
            {props.type === "Expenses" || props.type === "Income" ?
                (
                    <Box marginTop="20px">
                        <Grid templateColumns='repeat(3, 1fr)' gap={2}>
                            <GridItem colSpan={1}>
                                <StatisticsSection uid={props.uid} type={props.type} bg={props.bg} color={props.color} colorMode={props.colorMode}/>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <InformationTable uid={props.uid} type={props.type} bg={props.bg} color={props.color} colorMode={props.colorMode}/>
                            </GridItem>
                        </Grid>
                        
                        
                    </Box>
                ) : (
                    
                    <Calculation uid={props.uid} type={props.type}/>
                )

            }
            
            
        </Box>

    );
                
}

export default DashSection;