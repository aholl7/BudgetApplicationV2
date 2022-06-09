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
      var title = props.frequency + " " + props.type;
      
      return (
        <Stat bgColor="#FFFFFF">
            <StatLabel>{title}</StatLabel>
            <StatNumber>${props.data}</StatNumber>
        </Stat>
      );
  }

  export default Statistics;