import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product2 } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(private productService: ProductService) { }

  product = {} as Product2;

  ngOnInit(): void {
  }

  addProduct() {
    if(this.product.name !== '' && this.product.price != 0 && this.product.description != '') {
      this.productService.addProduct(this.product);
      this.product = {} as Product2;
    }
  }

}