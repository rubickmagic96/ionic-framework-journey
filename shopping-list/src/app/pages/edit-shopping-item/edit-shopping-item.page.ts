import { ShoppingListService } from './../../services/shopping-list/shopping-list.service';
import { Item } from './../../interfaces/item/item';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-edit-shopping-item',
  templateUrl: './edit-shopping-item.page.html',
  styleUrls: ['./edit-shopping-item.page.scss'],
})
export class EditShoppingItemPage implements OnInit {
  item: Item;

  constructor(
    private router: Router, 
    private shopping: ShoppingListService,
    private toast: ToastService) {
    
  }

  ngOnInit() {
    this.item = this.router.getNavigatedData();
  }

  saveItem(item: Item) {
    this.shopping.editShoppingList(item).then(() => {
      this.toast.showMessage(`${item.name} saved!`);
      this.router.navigateByUrl('/home');
    });
  }

  deleteItem(item: Item) {
    this.shopping.removeShoppingList(item).then(() => {
      this.toast.showMessage(`${item.name} deleted!`);
      this.router.navigateByUrl('/home');
    });
  }

}
