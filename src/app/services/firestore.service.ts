import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Photo } from '@capacitor/camera';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore, private authService: AuthService,
  ) { }

  createDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }


  creatDoc() {
    this.firestore.collection('Estudiantes')
  }

  // getCollection() {
  //   console.log('estoy por ler una conexion');
  //   this.firestore.collection('Estudiantes').valueChanges().subscribe((res) => {
  //     console.log('res ->', res);

  //   });
  // }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDocc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }

  //actualizar
  updateDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  //eliminar
  deleteDoc(path: string, id: string) {
    return this.firestore.collection(path).doc(id).delete();

  }

  async uploadImage(cameraFile: Photo) {

    const user = this.authService.getUid;
    const path = `Avatar/${user}/profile.png`;
    // const storageRef = ref(this.storage, path);

    // try {
    //   await uploadString(storageRef, cameraFile.base64String, 'base64');

    //   const imageUrl = await getDownloadURL(storageRef);

    //   const userDocRef = doc(this.firestore, `users/${user.uid}`);
    //   await setDoc(userDocRef, {
    //     imageUrl,
    //   });
    //   return true;
    // } catch (e) {
    //   return null;
    // }
  }
}
