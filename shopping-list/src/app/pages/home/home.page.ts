import { Router } from '@angular/router';;
import { Component } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../interfaces/item/item';
import "angular2-navigate-with-data";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  shoppingList$: Observable<Item[]>;

  constructor(public router: Router, private shopping: ShoppingListService) {
    this.shoppingList$ = this.shopping.getShoppingList().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() as Item }));
      })
    )
  }

  goToAddShoppingItemPage() {
    this.router.navigateByUrl('/add-shopping-item');
  }

  goToEditShoppingItemPage(item) {
    this.router.navigateByData({
      url: ['/edit-shopping-item'],
      data: item
    });
  }
}
