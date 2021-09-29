import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut } from 'firebase/auth';


import firebaseConfig from './config';

class Firebase {
    
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.user = 'h';
    }    

    async registrarUsuario(nombre, email, password){

        const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
        await updateProfile(this.auth.currentUser, {
            displayName: nombre
        });

        return nuevoUsuario;
    }

    async initSesion(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    async cerrarSesion() {
        return await signOut(this.auth);
    }
    
}

const firebase = new Firebase();

export default firebase;