import React,{useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../index';

const RootNavigation = () => {

const[loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if(user){
      setLoggedIn(true);
    } else{
      setLoggedIn(false);
    }
  
  });

    // const{user} = useAuth();

    return loggedIn ? <UserStack/> : <AuthStack/>
}

export default RootNavigation;