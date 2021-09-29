import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


import firebaseConfig from './config';

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
    }    
    async registrarUsuario(nombre, email, password){
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        const current = this.auth.currentUser;
        console.log(current);
        return await nuevoUsuario.auth().updateProfile({
            displayName: nombre
        });

    }
}

const firebase = new Firebase();

export default firebase;