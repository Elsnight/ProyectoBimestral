import { Injectable } from '@angular/core';
import { async } from '@firebase/util';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  loading: any;
  handlerMessage = '';
  roleMessage = '';


  constructor(
    public toastController: ToastController,
    private loadingCtrl: LoadingController,
    private alertController: AlertController) { }


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async showLoading(mensaje: string) {
    this.loading = await this.loadingCtrl.create({
      message: mensaje,
    });
    this.loading.present();
  }

  async closeLoading() {
    await this.loading.dismiss();
  }


  async presentAlert(texto: string, subtitulo: string) {

    let aceptar = false;

    const alert = await this.alertController.create({
      header: texto,
      subHeader: subtitulo,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { this.handlerMessage = 'Alert canceled'; }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { aceptar = true, this.handlerMessage = 'Alert confirmed'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
    return aceptar
  }


}
