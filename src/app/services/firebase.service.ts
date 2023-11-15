import { Injectable, inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query} from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject (AngularFireAuth)
  firesore = inject(AngularFirestore)
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

  // Obtener datos de una colección
  getCollectionData(path: string, collectionQuery?: any){
    const ref = collection(getFirestore(), path)
    return collectionData(query(ref,collectionQuery), {idField : 'id'})
  }

}
