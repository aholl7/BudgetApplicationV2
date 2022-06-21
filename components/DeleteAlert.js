import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
} from '@chakra-ui/react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../js/firebase.js";

const DeleteAlert = (props) => {
    
    const deleteElement = async () => {
        await deleteDoc(doc(db, props.type, props.compId));
        props.onClose();
    }
    
    return (
      
     <>
        
        <AlertDialog
          isOpen={props.isOpen}
          leastDestructiveRef={props.cancelRef}
          onClose={props.onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete {props.type === "Expenses" ? "Expense" : props.type === "Income" ? "Income" : ""}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can&apos;t undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={props.cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={deleteElement} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}

export default DeleteAlert;