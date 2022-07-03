import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private autenticacion: AngularFireAuth) { }

  login(correo: string, password: string) {
    return this.autenticacion.signInWithEmailAndPassword(correo, password)
  }

  logout() {
    this.autenticacion.signOut();
  }

  //registrar usuario
  registerUser(datos: User) {
    return this.autenticacion.createUserWithEmailAndPassword(datos.correo, datos.password);
  }

  stateUser() {
    return this.autenticacion.authState
  }

}
