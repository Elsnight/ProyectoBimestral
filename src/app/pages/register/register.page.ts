import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  datos: User = {
    nombre: null,
    apellido: null,
    correo: null,
    contraseña: null,
    cedula: null,
    genero: null,
  }

  constructor() { }

  ngOnInit() {
  }

}
