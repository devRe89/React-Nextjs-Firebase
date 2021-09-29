import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


import firebaseConfig from './config';

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.current = this.auth.currentUser;
    }    
    async registrarUsuario(nombre, email, password){
        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        });

    }
}

const firebase = new Firebase();

export default firebase;