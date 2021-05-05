import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";


@Injectable()
export class Helper {


  constructor(
    public toastCtrl: ToastController,
  ) {

  }

  async showMessage(msg: any, duration?: any, cssClass?: string) {
     const alert = await this.toastCtrl
      .create({
        message: msg,
        duration: duration || 2000,
        cssClass: cssClass || "",
      })
      // .present();
       await alert.present();
  }
}
