import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) {

  }

  async showMessage(message: string, duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message,
      duration
    });
    toast.present();
  }
}
