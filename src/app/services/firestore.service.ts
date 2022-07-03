import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

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
}
