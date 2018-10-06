import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Item } from "../../models/item/item.model";

@Injectable()
export class ShoppingListServices {
    // private shoppingListRef = this.db.collection<Item>('shopping-list');
    constructor(db: AngularFirestore) {

    }

    // getShoppingList() {
    //     return this.shoppingListRef;
    // }

    // addItem(item) {
    //     return this.shoppingListRef.add(item);
    // }
}