import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public info: any = {
    username : '',
    password : '',
  };

  status: string;

  constructor(private authService: AuthService,
              private router: Router,
              ) {}

  ngOnInit()  {
  }


  doSubmit() {
    if (!this.authService.login(this.info.username, this.info.password)) {
      this.status = 'Log in failed!';
    } else {
      this.router.navigate(['/home']);
    }
  }

  doCancel() {
    this.info.username = '';
    this.info.password = '';
    this.status = 'Canceled';
  }

}
