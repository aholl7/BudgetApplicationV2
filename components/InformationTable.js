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

const InformationTable = (props) => {
      return (
        <Box>
            <TableContainer width="100%" border="1px solid lightgrey" borderRadius="2px" marginTop="30px">
                <Table variant='simple' bgColor="#FFFFFF" size="lg">
                    <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Frequency</Th>
                        <Th>Amount</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        
                    </Tbody>
                    
                </Table>
            </TableContainer>
        </Box>
      );
  }

export default InformationTable;