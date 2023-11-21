import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {EmailAuthProvider, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  firebaseAuth = inject (AngularFireAuth)
  firestore = inject(AngularFirestore)
  utilsSvc = inject(UtilsService)


    // ============= Auntenticación ======================

  // Autenticación
  getAuth(){
    return getAuth();
  }

  // Inicia sesión
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crea usuario
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, {displayName});
  }

  // Envia email para reemplazar contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Cerrar sesión
  signOut(){
    getAuth().signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('expense');
    this.utilsSvc.routerLink('/auth');
  }

  
  async deleteUser(uid: string, email: string, password: string): Promise<void> {
    try {
      // Reautenticar al usuario para realizar operaciones sensibles
      const user = await this.firebaseAuth.currentUser;
      if (user) {
        // Utiliza 'EmailAuthProvider.credential' con los datos proporcionados
        const credential = EmailAuthProvider.credential(user.email, password);
        await user.reauthenticateWithCredential(credential);
        // Eliminar el usuario de Authentication
        await user.delete();
      }
      // Eliminar el usuario de Firestore
      await this.firestore.collection('users').doc(uid).delete();
    } catch (error) {
      throw error;
    }
    this.signOut();
  }
    // ============= Base de datos ======================

  // Setear un documento
  setDocument(path: string, data:any){
    return setDoc(doc(getFirestore(), path), data);
  }

  // Obtener documento
  async getDocument(path: string){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  // agregar documento
  addDocument (path: string, data:any){
    return addDoc(collection(getFirestore(), path), data)
  }

  // Actualizar un documento
  updateDocument(path: string, data:any){
    return updateDoc(doc(getFirestore(), path), data);
  }

  // Eliminar un documento
  deleteDocument(path: string,){
    return deleteDoc(doc(getFirestore(), path));
  }

  
  // Obtener datos de una colección
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery))
  }

}
