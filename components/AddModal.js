import react from "react";
import { useState, useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button, 
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Select,
    Checkbox, 
    CheckboxGroup,
    Stack
  } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from "../js/firebase.js";
//https://www.bestcolleges.com/resources/budgeting-in-college/
const AddModal = (props) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const text = props.type === "Expenses" ?  "Expenses" : props.type === "Income" ? "Income" : "";
    const [selectedFreq, setSelectedFreq] = useState("");
    const [monthlyChecked, setMonthlyChecked] = useState(false);
    const [semesterChecked, setSemesterChecked] = useState(false);
    const handleMonthlyChange = (event) => {
      setMonthlyChecked(event.target.checked);
    };

    const handleSemesterChange = (event) => {
        setSemesterChecked(event.target.checked);
    };
    const submitInfo = async (data) => {
        var amount = data.amount;
        if(amount.indexOf(".") === -1){
            amount += ".00";
        }else if(amount.indexOf(",") !== -1){
            amount = amount.replace(",", "");
        }
        /*
        var factored = [];
        if(monthlyChecked === true){
            factored.push("Monthly")
            if(semesterChecked === true){
                factored.push("Semester")
            }

        }
        else if(semesterChecked === true){
            factored.push("Semester")
        }
        data.factored = factored;
        */
        
        if(props.type === "Expenses"){
            const docRef = await addDoc(collection(db, "Expenses"), {
                uid: props.uid,
                expense: data.name,
                expenseType: data.type,
                frequency: data.frequency,
                amount: amount
            });
            onClose();
        }else{
            const docRef = await addDoc(collection(db, "Income"), {
                uid: props.uid,
                income: data.name,
                frequency: data.frequency,
                amount: amount
            });
            onClose();
        }

        console.log(data);
        reset({
            name: "",
            type: "",
            frequency: "",
            amount: ""
          });
    }

    
    return (
      <>
        <Button 
            color="#FFFFFF"
            bg="#0ACF83"
            width={{base: "50%", md: "30%"}}
            _hover={{ color: "#FFFFFF", bg: "#0ACF83"}}
            marginTop="20px"
            onClick={onOpen}
        >
        Add {text}
    </Button>

      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {text}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submitInfo)}>
          <ModalBody>
            
                <FormControl marginTop="15px" isInvalid={errors.name}>
                    <FormLabel>{props.type === "Expenses" ? text.slice(0, -1) : text}</FormLabel>
                    <Input
                        type="text" 
                        {...register("name", {
                            required: "Required Field",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>
                {props.type === "Expenses" && (
                    <FormControl marginTop="15px" isInvalid={errors.type}>
                        <FormLabel>Expense Type</FormLabel>
                        <Select placeholder='Select option'
                            {...register("type", {
                                required: "Please select an option",
                            })}
                        >
                            <option value='Fixed'>Fixed</option>
                            <option value='Variable'>Variable</option>
                        </Select>
                        <FormErrorMessage>
                            {errors.type && errors.type.message}
                        </FormErrorMessage>
                    </FormControl>
                )}
                
                
                <FormControl marginTop="15px" isInvalid={errors.frequency}>
                    <FormLabel>Frequency</FormLabel>
                    <Select placeholder='Select option' 
                        {...register("frequency", {
                            required: "Please select an option",
                        })}
                        onChange={(e) => setSelectedFreq(e.target.value)}
                    >
                        <option value='Once'>Once</option>
                        <option value='Monthly'>Monthly</option>
                        <option value='Semester'>Semester</option>
                        <option value='Academic Year'>Academic Year</option>
                    </Select>
                    <FormErrorMessage>
                        {errors.frequency && errors.frequency.message}
                    </FormErrorMessage>
                </FormControl>
                
                {/*<FormControl marginTop="15px" isInvalid={errors.calculation}>
                
                <FormLabel>I would like to factor this {props.type === "Expenses" ? "expense" : props.type} in: </FormLabel>
                    <Stack spacing={5} direction='row'>
                        <Checkbox 
                            value='Monthly' 
                            isDisabled={selectedFreq === "Monthly"} 
                            onChange={(e) => handleMonthlyChange(e)}
                            
                        >
                            Monthly
                        </Checkbox>
                        <Checkbox 
                            value='Semester' 
                            isDisabled={selectedFreq === "Monthly" || selectedFreq === "Semester" } 
                            onChange={(e) => handleSemesterChange(e)}
                            
                        >
                            By Semester
                        </Checkbox>
                    </Stack>
                    <FormErrorMessage>
                        {errors.calculation && errors.calculation.message}
                    </FormErrorMessage>
                </FormControl>
                    */}
                <FormControl marginTop="15px" isInvalid={errors.amount}>
                    <FormLabel>Amount ($)</FormLabel>
                    <Input 
                        {...register("amount", {
                            required: "Required Field",
                            pattern: {
                                value: /^\$?\d+(,\d{3})*(\.\d*)?$/,
                                message: "Please enter only numbers",
                            },
                            
                        })}
                    />
                    <FormErrorMessage>
                        {errors.amount && errors.amount.message}
                    </FormErrorMessage>
                </FormControl>
            
          </ModalBody>
          

          <ModalFooter>
            <Button 
                color="#FFFFFF"
                bg="#0ACF83"
                _hover={{ color: "#FFFFFF", bg: "#0ACF83"}} 
                 mr={3}
                 type="submit"
            >
              Save
            </Button>
            <Button 
                color="#FFFFFF"
                bg="#FF7262"
                 _hover={{ color: "#FFFFFF", bg: "#FF7262"}} 
                 onClick={onClose}
            >
                Cancel
            </Button>
          </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
    )
}

export default AddModal;