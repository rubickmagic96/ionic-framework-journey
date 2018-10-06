import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../../interfaces/item/item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private shoppingListRef = this.db.collection<Item>('shopping-list');
  constructor(private db: AngularFirestore) { }

  getShoppingList() {
    return this.shoppingListRef;
  }

  addShoppingList(item) {
    return this.shoppingListRef.add(item);
  }

  editShoppingList(item: Item) {
    return this.shoppingListRef.doc(item.key).update({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    });
  }

  removeShoppingList(item: Item) {
    return this.shoppingListRef.doc(item.key).delete();
  }
}
