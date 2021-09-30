import { initializeApp } from "firebase/app";
import firebaseConfig from './config';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";

class Firebase {
    
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        // this.storage = this.app.storage();
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

    async crearProducto(producto) {
        return await addDoc(collection(this.db, "productos"), producto);
    }
    
}

const firebase = new Firebase();

export default firebase;