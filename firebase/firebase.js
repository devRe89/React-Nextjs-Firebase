import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseConfig from './config';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signInWithEmailAndPassword, 
    signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, getDoc, doc, setDoc } from "firebase/firestore";

class Firebase {
    
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();
        this.db = getFirestore();
        this.storage = getStorage();
    }    

    async registrarUsuario(nombre, email, password) {
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

    async upImageProducto(file) {
        const storageRef = ref(this.storage, `imgsProductos/${file.name}`);
        await uploadBytes(storageRef, file);
        const urlImage = await getDownloadURL(storageRef);
        return urlImage;
    }

    async crearProducto(producto) {
        const urlImage = await this.upImageProducto(producto.Urlimagen);
        producto.Urlimagen = urlImage;
        return await addDoc(collection(this.db, "productos"), producto);
    }

    async getAllProducts() {
        const q = query(collection(this.db, 'productos'), orderBy('creado', 'desc'));
        const querySnapshot = await getDocs(q);
        const resq = [];
        querySnapshot.forEach((doc) => {
            resq.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return resq;
    }


    async getProductById(id) {
        const docRef = doc(this.db, 'productos', id);
        const product = await getDoc(docRef);
        return product;
    }

    async upVotosProduct(uid, producto, id) {
        const {haVotado, votos} = producto;

        if(haVotado.includes(uid)) {
            return null;
        }    

        const hanVotado = [...haVotado, uid];        
        const docRef = doc(this.db, 'productos', id);
        const nuevoTotal = votos + 1;
        await setDoc( docRef, {votos: nuevoTotal, haVotado: hanVotado}, {merge: true} );

        return nuevoTotal;
    }

    async upComentariosProduct(id, comentario, producto) {
        const {comentarios} = producto;

        const inComentarios = [...comentarios, comentario];
        const docRef = doc(this.db, 'productos', id);
        await setDoc( docRef, {comentarios: inComentarios}, {merge: true} );

        return comentario;
    }
    
}
const firebase = new Firebase();
export default firebase;
