import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product2 } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product2>;
  products: Observable<Product2[]>;
  productDoc: AngularFirestoreDocument<Product2>;

  constructor(public db: AngularFirestore) { 
    // this.products = this.db.collection('products').valueChanges();
    this.productsCollection = this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product2;
        data.id = a.payload.doc.id;
         return data;
      });
    }));
  }
  
  getProducts() {
    return this.products;
  }

  addProduct(product: Product2) {
    this.productsCollection.add(product);
  }

  deleteProduct(id: any) {
    this.productDoc = this.db.doc(`products/${id}`);
    this.productDoc.delete();
  }

   updateProduct(product: Product2) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
  } 

 
// Obtiene un Item
// Obtiene un Item
public getItem(documentId: string) {
 return( this.db.collection('products').doc(documentId).snapshotChanges());
}
}