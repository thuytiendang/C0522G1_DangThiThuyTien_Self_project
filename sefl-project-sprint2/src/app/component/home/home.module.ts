import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {CartComponent} from './cart/cart.component';
import {DrinkComponent} from './drink/drink.component';
import {FormsModule} from '@angular/forms';
import { PromotionComponent } from './promotion/promotion.component';
import { AboutComponent } from './about/about.component';
import { DetailDrinkComponent } from './detail-drink/detail-drink.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';


@NgModule({
  declarations: [HomeComponent, CartComponent, DrinkComponent, PromotionComponent, AboutComponent, DetailDrinkComponent, CustomerInfoComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule {
}
