import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../decentralization/auth.guard';
import {CartComponent} from './cart/cart.component';
import {HomeComponent} from './home/home.component';
import {DrinkComponent} from './drink/drink.component';
import {PromotionComponent} from './promotion/promotion.component';
import {AboutComponent} from './about/about.component';
import {DetailDrinkComponent} from './detail-drink/detail-drink.component';
import {CustomerInfoComponent} from './customer-info/customer-info.component';
import {HistoryComponent} from './history/history.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'drink',
    component: DrinkComponent
  },
  {
    path: 'promotion',
    component: PromotionComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'detail/:id',
    component: DetailDrinkComponent
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: CartComponent
  },
  {
    path: 'customer',
    component: CustomerInfoComponent
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: HistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
