import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public info: any = {
    username : '',
    password : '',
  };

  status: string;

  constructor(private authService: AuthService,
              private router: Router,
  ) {}



  doSubmit() {
    if (!this.authService.login(this.info.username, this.info.password)) {
      this.status = 'Log in failed!';
    } else {
      this.status = 'Log in successfully!';
    }
  }

  doCancel() {
    this.info.username = '';
    this.info.password = '';
    this.status = 'Canceled';
  }

}
