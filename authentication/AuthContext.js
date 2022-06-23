import React, { useEffect, useState} from "react"
import { db, auth } from "../js/firebase";
import { onAuthStateChanged } from "firebase/auth"
import { getDoc, doc } from  "firebase/firestore";
import LoadingScreen from "../components/LoadingScreen";

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({uid: "", firstName: "", lastName: "", email: ""})

  const getUserInfo = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //console.log(docSnap.data())
        setUserInfo({uid: uid, firstName: docSnap.data().firstName, lastName: docSnap.data().lastName, email: docSnap.data().email})
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        window.alert("No such document!");
      }
  }
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
          /*
        getUserInfo(user.uid)*/
        setCurrentUser(user)
        setLoading(false);
      } else {
        setCurrentUser(null)
        setLoading(false);
      }
      
    })
  }, [userInfo])

  if (loading) {
    return (
        <LoadingScreen />
    )
  }

  

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}