import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  public info: any = {
    username : '',
    password : '',
  };

  status: string;

  constructor(private authService: AuthService,
              private navCtrl: NavController,
  ) {}



  doSubmit() {
    if (!this.authService.login(this.info.username, this.info.password)) {
      this.status = 'Log in failed!';
    } else {
      this.status = 'Log in successfully!';
      this.navCtrl.navigateForward('/tabs/tab1');
    }
  }

  doCancel() {
    this.info.username = '';
    this.info.password = '';
    this.status = 'Canceled';
  }


}
