import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from "../productos.service";
import {Product} from "../product";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { ProductService } from '../services/product.service';
import { Product2 } from '../models/product';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  
  term : string;
  p: number = 1;

  profileForm: FormGroup;

  id = '';
  name = '';
  description = '';
  price: number = null;
  data: Product[] = [];
  actualizar:boolean=false;
  tituloModal:string="Agregar";
  displayedColumns: string[] = ['id', 'name', 'description', 'price','actions'];
  isLoadingResults = true;
  products = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(private api: ProductosService,private formBuilder: FormBuilder,
    public productService: ProductService ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      'id' :'',
      'name' : [null, Validators.required],
      'description' : [null, Validators.required],
      'price' : [null, Validators.required]
    });
    this.productService.getProducts().subscribe(products => {
      this.dataSource= new MatTableDataSource(products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     

      this.products=products;
      console.log(this.data);
    });    
    
    
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSubmit() {
    if (this.actualizar){
      
    this.onFormSubmit();
    return
    }else {
     
    // TODO: Use EventEmitter with form 
    this.productService.addProduct(this.profileForm.value)
    this.reseteo();
    }
}
reseteo(){
  this.profileForm.setValue({
    id:'',
   name: '',
   description: '',
   price: null
 })
}
editar(id: any) {
  console.log(id);
  this.actualizar=true;
  this.tituloModal="Editar";
  this.productService.getItem(id).subscribe((data: any) => {
    this.profileForm.setValue({
     id:id,
    name: data.payload.data()['name'],
    description: data.payload.data()['description'],
    price: data.payload.data()['price']
  })
})
}

borrar(id: any) {
  this.isLoadingResults = true;
  this.productService.deleteProduct(id);
       
}

 onFormSubmit() {
  this.actualizar=false;

  console.log(this.profileForm.value)
  this.isLoadingResults = true;
   this.productService.updateProduct(this.profileForm.value) ;
  
  };
        

}


export interface misDatos {
  id: string;
  name: string;
  description:string;
  price: number;
}