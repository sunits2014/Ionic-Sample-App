import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      color: 'dark',
      message: message,
      position: 'bottom',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
