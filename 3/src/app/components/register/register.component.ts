import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
        this.router.navigate(['/login']);
      }
    } else {
      this.status = 'Please enter username and password';
    }
  }

  doCancel() {
    this.router.navigate(['/login']);
  }
}
