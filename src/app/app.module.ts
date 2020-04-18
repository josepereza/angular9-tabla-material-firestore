import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ModalManagerModule } from '@browninglogic/ng-modal';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ProductosService } from "./productos.service";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";






import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';




import { AppComponent } from './app.component';
import { ListadoComponent } from './listado/listado.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';

// FIRESTORE
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Service
import { ProductService } from './services/product.service';
import { ProductFormComponent } from './compnent/product-form/product-form.component';
@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,MatPaginatorModule,MatSortModule,MatTableModule, BrowserAnimationsModule,
    ModalManagerModule,MatFormFieldModule,MatInputModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
