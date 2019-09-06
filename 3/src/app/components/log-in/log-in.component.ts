import { Component, OnInit } from '@angular/core';
import {ngModuleJitUrl} from '@angular/compiler';
import {Subject} from "rxjs";
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }
  private subject = new Subject<any>()
  public info: any = {
    username : '',
    password : '',
};
  public   Username;
  public   Password;
  public   status;
  ngOnInit()  {


  }
  doRegister() {
this.Username = this.info.username;
this.Password = this.info.password;
this.info.username = '';
this.info.password = '';
this.status = 'Register succeeded!';
  }
  doSubmit() {
    if (this.info.username === this.Username) {
      this.status = 'Log in succeeded!'
      console.log(this.status);
  } else {this.status = 'username/password is wrong!'; }
  }

  doCancel() {
    this.info.username = '';
    this.info.password = '';
    this.status = 'Canceled';
  }

}
