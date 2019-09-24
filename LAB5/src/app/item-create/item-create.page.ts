import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {ItemService} from '../services/item.service';
import {AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.page.html',
  styleUrls: ['./item-create.page.scss'],
})
export class ItemCreatePage implements OnInit {
  public info: any = {
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
  };

  constructor(private itemService: ItemService,
              private alertController: AlertController,
              private navCtrl: NavController,
              ) { }

  ngOnInit() {
    Geolocation.getCurrentPosition()
        .then((res) => {
          this.info.latitude = res.coords.latitude;
          this.info.longitude = res.coords.longitude;
        }, err => {
          this.presentAlert(err.message);
        });
  }

  createItem() {
    this.itemService.createItem(this.info)
        .then(res => {
          this.presentAlert('Item has been created.');
          this.goHomePage();
        }, err => {
          this.presentAlert(err.message);
        });
  }

  async presentAlert(value: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: value,
      buttons: ['OK']
    });

    await alert.present();
  }

  goHomePage() {
    this.navCtrl.navigateBack('/home');
  }
}
