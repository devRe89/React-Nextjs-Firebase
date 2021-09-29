import React, { useState, useEffect } from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const useAutentication = () =>{
    const [autentication, setAutentication] = useState(null);

    useEffect(() => {
       const authSesion = onAuthStateChanged(getAuth(), (user) => {
           if(user){
            setAutentication(user);
           }else{
            setAutentication(null);
           }
       }); 
       return () => authSesion();
    }, []);

    return autentication;
}

export default useAutentication;