import { Component } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  coords: any;
  accuracy: any;
  error: any;
  constructor() {}

  watch() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.coords = resp.coords.latitude + ' ' + resp.coords.longitude;
      this.accuracy = resp.coords.accuracy + 'meters';
    }).catch((error) => {
      this.error = 'Failed to get location!' + error;
    });
  }
}
