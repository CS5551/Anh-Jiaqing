import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public info: any = {
    username : '',
    password : '',
  };

  status: string;

  constructor(private authService: AuthService,
              private router: Router,
  ) {}

  ngOnInit() {
  }

  doRegister() {
    if (this.info.username !== '' && this.info.password !== '') {
      if (!this.authService.register(this.info.username, this.info.password)) {
        this.status = 'The username is taken';
      } else {
        this.status = 'created successfully!';
      }
    } else {
      this.status = 'Please enter the info!';
    }
  }

  doCancel() {
    this.info.username = '';
    this.info.password = '';
    this.status = 'Canceled';
  }
}
