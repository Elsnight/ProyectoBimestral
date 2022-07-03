import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  datos: User = {
    nombre: null,
    edad: null,
    correo: null,
    uid: null,
    password: null,
    perfil: 'admin'
  }
  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction: ConfirmService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async registrar() {
    await this.interaction.showLoading('Registrando...')
    console.log(this.datos);
    const res = await this.auth.registerUser(this.datos).catch(
      error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Error')
        console.log('error');

      }
    )
    if (res) {
      console.log('exito al crear el usuario');
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null, //eliminar contraseña
        await this.firestore.createDoc(this.datos, path, id);
      this.interaction.presentToast('Registrado con exito');
      this.router.navigate(['/home'])
    }

  }

}
