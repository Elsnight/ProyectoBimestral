import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;

  rol: 'visitante' | 'admin' = null

  constructor(
    public popoverController: PopoverController,
    private auth: AuthService,
    private interaction: ConfirmService,
    private firestore: FirestoreService,

    private router: Router,
  ) {
    this.auth.stateUser().subscribe(
      res => {
        if (res) {
          console.log('esta logueado');
          console.log(res.uid);
          this.login = true;
          this.getdatosUser(res.uid)
        } else {
          console.log('no esta logueado');
          this.login = false;
        }
      }
    )

  }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('sesion finalizada');
    this.router.navigate(['/login'])
  }

  // getDatosUser(uid: string) {
  //   const path = 'Usuarios';
  //   const id = uid;
  //   this.firestore.getDocc<User>(path, id).subscribe(res => {
  //     console.log('datos ->', res);
  //     if (res) {
  //       res.perfil
  //     }


  //   }
  //   )

  // }
  getdatosUser(uid: string) {
    const path = 'Usuarios';
    const id = uid;
    this.firestore.getDocc<User>(path, id).subscribe(res => {
      console.log('datos', res);
      if (res) {
        this.rol = res.perfil
      }
    })
  }



}
