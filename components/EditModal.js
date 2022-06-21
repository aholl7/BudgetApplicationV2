import React from "react";
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
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { 
    collection, 
    doc, 
    updateDoc, 
    query, 
    where, 
    getDocs 
} from "firebase/firestore"; 

import { db } from "../js/firebase.js";
//https://www.bestcolleges.com/resources/budgeting-in-college/
const EditModal = (props) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({});
    const text = props.type === "Expenses" ?  "Expenses" : props.type === "Income" ? "Income" : "";
    const [name, setName] = useState(props.compName);
    const [expenseType, setExpenseType] = useState(props.compType);
    const [amount, setAmount] = useState(props.compAmount);            
    const [selectedFreq, setSelectedFreq] = useState(props.compFrequency);
    
    /*
    const [monthlyChecked, setMonthlyChecked] = useState(false);
    const [semesterChecked, setSemesterChecked] = useState(false);
    */
    const handleMonthlyChange = (event) => {
      setMonthlyChecked(event.target.checked);
    };
    const handleSemesterChange = (event) => {
        setSemesterChecked(event.target.checked);
    };
    const submitInfo = async (data) => {
        if(props.type === "Expenses"){
            const docRef = doc(db, props.type, props.compId);
            var editedAmount = amount;
            if(editedAmount.indexOf(".") === -1){
                editedAmount += ".00";
            }else if(editedAmount .indexOf(",") !== -1){
                editedAmount = editedAmount .replace(",", "");
            }
            await updateDoc(docRef, {
                amount: editedAmount,
                expense: name,
                expenseType: expenseType,
                frequency: selectedFreq,
            });
            props.onClose();
        }else{
            
            const docRef = doc(db, props.type, props.compId);
            var editedAmount = amount;
            if(editedAmount.indexOf(".") === -1){
                editedAmount += ".00";
            }else if(editedAmount .indexOf(",") !== -1){
                editedAmount = editedAmount .replace(",", "");
            }
            await updateDoc(docRef, {
                amount: editedAmount,
                expense: name,
                frequency: selectedFreq,
            });
            props.onClose();
            
        }
        
        reset({
            name: "",
            type: "",
            frequency: "",
            amount: ""
          });
    }

    const nameNotTaken = async (name) => {
        var field = props.type === "Expenses" ? "expense" : "income";
        var q = query(
          collection(db, props.type),
          where(field, "==", name),
          where("uid", "==", props.uid),
        );
    
        const snapshot = await getDocs(q);
    
        if (snapshot.size > 0 && name !== props.compName) {
          return false;
        } else {
          return true;
        }
      };
    
      const returnNameNotTaken = async (name) => {
        return await nameNotTaken(name);
      };

    
    
    
    return (
      
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {text}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(submitInfo)}>
          <ModalBody>
                <FormControl marginTop="15px" isInvalid={errors.name}>
                    <FormLabel>{props.type === "Expenses" ? text.slice(0, -1) : text}</FormLabel>
                    <Input
                        type="text" 
                        {...register("name", {
                            required: "Required Field",
                            validate: {
                                isTaken: async (v) =>
                                    (await returnNameNotTaken(v)) ||
                                    "Already exists!",
                            },
                        })}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        
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
                            value={expenseType}
                            onChange={(e) => setExpenseType(e.target.value)}
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
                        value={selectedFreq}
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
                                value: /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{2})?$/,
                                message: "Please enter only numbers",
                            },
                            
                        })}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
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
                 onClick={props.onClose}
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

export default EditModal;