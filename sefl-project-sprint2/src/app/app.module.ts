import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home/home.component';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DrinkComponent} from './component/home/drink/drink.component';
import {CartComponent} from './component/home/cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DecentralizationModule} from './component/decentralization/decentralization.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DrinkComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DecentralizationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
