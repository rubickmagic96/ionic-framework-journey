import { Router } from '@angular/router';
import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item/item';
import "angular2-navigate-with-data";
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-add-shopping-item',
  templateUrl: './add-shopping-item.page.html',
  styleUrls: ['./add-shopping-item.page.scss'],
})
export class AddShoppingItemPage implements OnInit {
  item: Item = {
    name: '',
    quantity: undefined,
    price: undefined
  }

  constructor(
    private router: Router, 
    private shopping: ShoppingListService,
    private toast: ToastService) { }

  ngOnInit() {
  }

  addItem(item: Item) {
    this.shopping.addShoppingList(item).then(ref => {
      this.toast.showMessage(`${item.name} added!`);
      this.router.navigateByData({
        url: ["/home"],
        data: ref.id
      })
    });
  }
}
