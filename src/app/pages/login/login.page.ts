import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  credenciales = {
    correo: null,
    password: null

  }

  constructor(
    private autenticacion: AuthService,
    private interaction: ConfirmService,
    private router: Router) { }

  ngOnInit() {
  }

  async login() {
    await this.interaction.showLoading('Ingresando...')
    console.log('credenciales ->', this.credenciales);
    const res = await this.autenticacion.login(this.credenciales.correo, this.credenciales.password).catch(
      error => {
        console.log('error');
        this.interaction.closeLoading();
        this.interaction.presentToast('usuario o contraseña invalido')
      }
    );
    if (res) {
      console.log('res->', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('Ingresado con exito');
      this.router.navigate(['/home'])

    }
  }

}
