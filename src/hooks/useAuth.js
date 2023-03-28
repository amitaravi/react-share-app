import React, {useEffect, useState} from "react"
import {getAuth, onAuthStateChanged} from "firebase/auth"

const auth = getAuth();

const useAuth = () => {
    const[user, setUser] = useState<import("firebase/auth").User>("");

    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            } else{
                setUser(undefined);
            }
        })

        return unsubscribeFromAuthStateChanged;
    },   [])

    return {
        user,
    }
}

export default useAuth;