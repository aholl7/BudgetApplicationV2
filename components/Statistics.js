import {
    Stat,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react';

  const Statistics = (props) => {
        var isNegative = props.data < 0 ? true : false;
        var title = props.frequency + " " + props.type;
        const amount = props.data;
        
       
        var formattedAmount = amount.toFixed(2);
        var formattedAmount = formattedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        
        
      return (
        <Stat bgColor="#FFFFFF">
            <StatLabel>{title}</StatLabel>
            <StatNumber 
                color={
                    isNegative && props.type === "Difference" ? "#E53E3E" : 
                    !isNegative && props.type === "Difference" ? "#38A169" :
                    ""
                }
            >
                    ${formattedAmount}
            </StatNumber>
        </Stat>
      );
  }

  export default Statistics;