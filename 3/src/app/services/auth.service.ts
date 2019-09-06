import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users = [];
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  }

  register(username: string, password: string) {
    if (this.users.find(x => x.username === username)) {
      return false;
    }

    this.users.push({username, password});
    localStorage.setItem('users', JSON.stringify(this.users));
    return true;
  }

  login(username: string, password: string) {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    if (!this.users.find(x => x.username === username)) {
      return false;
    } else if (this.users.find(x => (x.username === username && x.password === password))) {
      return true;
    }
  }
}
