import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: '';
  password: '';

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              public alertController: AlertController,
  ) {}

  async presentAlert(value) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  login() {
    this.authService.login(this.email, this.password)
        .then(res => {
          this.navCtrl.navigateForward('/home');
        }, err => {
          this.presentAlert(err.message);
        });
  }
}
