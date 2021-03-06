import { DataProvider } from './../../providers/data/data';
import { ItemDetailPage } from './../item-detail/item-detail';
import { AddItemPage } from './../add-item/add-item';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: DataProvider) {
    this.dataService.getData().then((todos) => {
      if (todos) {
        this.items = todos;
      }
    });
  }

  ionViewDidLoad() {
    
  }

  addItem() {
    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  viewItem(item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item,
    });
  }

  saveItem(item) {
    this.items.push(item);
    this.dataService.save(this.items);
  }
}
