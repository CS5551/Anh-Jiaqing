import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import GeoPoint = firebase.firestore.GeoPoint;
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Item {
  title: string;
  description: string;
  owner: string;
  location: GeoPoint;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsCollection: AngularFirestoreCollection<Item>;

  private items: Observable<Item[]>;

  constructor(private db: AngularFirestore
  ) {
    this.itemsCollection = this.db.collection<Item>('items');

    this.items = this.itemsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Item;
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
    );
  }

  createItem(value) {
    return new Promise<any>((resolve, reject) => {
        const currentUser = firebase.auth().currentUser;
        this.itemsCollection
          .add({
            title: value.title,
            description: value.description,
            owner: currentUser.uid,
            location: new GeoPoint(value.latitude, value.longitude),
          })
          .then(
              res => resolve(res),
              err => reject(err)
          );
    });
  }

  getItems() {
    return this.items;
  }
}
