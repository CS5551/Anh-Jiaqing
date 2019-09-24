import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Item, ItemService} from '../services/item.service';
import {AuthService} from '../services/auth.service';
import {NavController} from '@ionic/angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Item[];
  uid: string;
  private itemSubscr: Subscription;

  constructor(private itemService: ItemService,
              private authService: AuthService,
              private navCtrl: NavController,
              ) {}

  ionViewWillEnter() {
    this.uid = firebase.auth().currentUser.uid;
    this.itemSubscr = this.itemService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  ionViewWillLeave() {
    this.itemSubscr.unsubscribe();
  }

  trackByFn(index: number, item: any): number {
    return item.serialNumber;
  }

  convertLocation(location) {
    return location.latitude + ' ' + location.longitude;
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
