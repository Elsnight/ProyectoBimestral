import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


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

}
