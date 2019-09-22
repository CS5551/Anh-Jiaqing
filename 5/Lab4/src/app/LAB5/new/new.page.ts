import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { NavController, Platform, AlertController } from 'ionic-angular';
@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NEWPage implements OnInit {
  data = { title: '', description: '', date: '', time: '' };
  // @ts-ignore
  constructor(public navCtrl: NavController,
              public localNotifications: LocalNotifications,
              public platform: Platform,
              public alertCtrl: AlertController) {}

  ngOnInit() {
  }
  submit() {

    console.log(this.data);
    // tslint:disable-next-line:prefer-const
    let date = new Date(this.data.date + ' ' + this.data.time);
    console.log(date);
    this.localNotifications.requestPermission().then((permission) => {
      this.localNotifications.schedule({
        id: 1,
        title: 'Hello World',
        text: 'Note here',
        at: date,
        led: 'FF0000',
        sound: 'file://assets/sounds/Rooster.mp3'

      });
      const alert = this.alertCtrl.create({
        title: 'Congratulation!',
        subTitle: 'Notification setup successfully at ' + date,
        buttons: ['OK']
      });
      alert.present();
      this.data = {title: '', description: '', date: '', time: ''};
    });
  }
}
