import { useState, useEffect } from "react";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Box
  } from '@chakra-ui/react';

  const Statistics = (props) => {
        var isNegative = props.data < 0 ? true : false;
        var title = props.frequency + " " + props.type;
        const amount = props.data;
        var internationalNumberFormat = new Intl.NumberFormat('en-US')
        var formattedAmount = internationalNumberFormat.format(amount);
        
        if(formattedAmount.indexOf(".") === -1){
            formattedAmount += ".00";
        }
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