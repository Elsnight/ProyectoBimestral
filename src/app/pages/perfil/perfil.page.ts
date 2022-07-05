import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/models/models';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string = null;

  //crear variable mostrare datos
  info: User = null;

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService,
    private alertController: AlertController,
    private interaction: ConfirmService) { }

  async ngOnInit() {
    console.log('estoy en pefil');
    this.authService.stateUser().subscribe(
      res => {
        console.log('en perfil - estado de autenticacion ->', res);
        this.getuid();

      });
    this.getuid();


  }

  async getuid() {
    const uid = await this.authService.getUid()
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid);
      this.getInfouser();
    } else {
      console.log('no existe uid');
    }


  }

  getInfouser() {
    const path = 'Usuarios';
    const id = this.uid;
    this.firestore.getDocc<User>(path, id).subscribe(
      res => {
        if (res) {
          this.info = res
        }
        console.log('datos perfil ->', res);

      }
    )


  }

  //editr atributo
  async editarAtributo(name: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar ' + name,
      inputs: [
        {
          name: name,
          type: 'text',
          placeholder: 'Ingresa tu ' + name
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('confirm cancel');
          }
        }, {
          text: 'aceptar',
          handler: (ev) => {
            console.log('confirm ok', ev);
            this.saveAtributo(name, ev[name]);
          }
        }
      ]
    });

    await alert.present();
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Editar edad',
  //     inputs: [
  //       {
  //         name: 'edad',
  //         type: 'number',
  //         placeholder: 'Ingresa tu edad'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: () => {
  //           console.log('confirm cancel');
  //         }
  //       }, {
  //         text: 'aceptar',
  //         handler: (ev) => {
  //           console.log('confirm ok', ev);
  //           this.saveEdad(ev.edad);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  async saveAtributo(name: string, input: any) {
    await this.interaction.showLoading('actualizando/.....');
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
    };
    updateDoc[name] = input;
    this.firestore.updateDoc(updateDoc, path, id).then(() => {
      this.interaction.presentToast('actualizado con exito');
      this.interaction.closeLoading();
    }
    )
  }



}
