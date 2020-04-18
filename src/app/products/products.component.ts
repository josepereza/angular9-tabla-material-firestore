import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product2 } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  editing: boolean = false;
  editingProduct: Product2;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });    
  }

  deleteProduct(product) {
    if (confirm("Are you sure you want to delete it?")){
      console.log('este es el codigo'+ product)
    this.productService.deleteProduct(product);
    }
  }

  editProduct(event, product) {
    this.editing = !this.editing;
    this.editingProduct = product;
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product2;
    this.editing = false;
  }
}