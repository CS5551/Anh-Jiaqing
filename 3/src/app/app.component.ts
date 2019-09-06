import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW1';
  public SavedInfo: any = {
    password : '123456',
    username : 'Louis'
};
}
