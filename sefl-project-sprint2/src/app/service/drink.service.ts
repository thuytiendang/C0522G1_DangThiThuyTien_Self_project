import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResult} from '../dto/data-result';
import {IDrinkDto} from '../dto/idrink-dto';
import {IOrderDto} from '../dto/iorder-dto';
import {IPromotion} from '../model/i-promotion';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private API_URL = environment.api_url;

  constructor(private http: HttpClient) {
  }

  getAllDrink(page: number, nameSearch: string): Observable<DataResult<IDrinkDto>> {
    return this.http.get<DataResult<IDrinkDto>>(this.API_URL + 'drink/list?page=' + page + '&nameSearch=' + nameSearch);
  }

  listCart(id: number): Observable<IOrderDto[]> {
    return this.http.get<IOrderDto[]>(this.API_URL + 'order/list-cart/' + id);
  }

  findAllCustomer(username: string): Observable<any> {
    console.log(this.API_URL + 'order/find-all-customer/' + username);
    return this.http.get(this.API_URL + 'order/find-all-customer/' + username);
  }

  addToCart(quantity: number, customerId: number, drinkId: number): Observable<void> {
    return this.http.get<void>(this.API_URL + 'order/add-cart/' + quantity + '&' + customerId + '&' + drinkId);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.get<void>(this.API_URL + 'order/delete-cart/' + id);
  }

  ascQuantity(id: number): Observable<void> {
    return this.http.get<void>(this.API_URL + 'order/asc-quantity/' + id);
  }

  descQuantity(id: number): Observable<void> {
    return this.http.get<void>(this.API_URL + 'order/desc-quantity/' + id);
  }

  getAllPromotion(page: number, name: string): Observable<DataResult<IPromotion[]>> {
    return this.http.get<DataResult<IPromotion[]>>(this.API_URL + 'promotion/list?page=' + page + '&name=' + name);
  }

  getDrinkById(id: number): Observable<IDrinkDto> {
    return this.http.get<IDrinkDto>(this.API_URL + 'drink/detail/' + id);
  }

  getCount(customerId: number): Observable<any> {
    return this.http.get(this.API_URL + 'order/count-drink/' + customerId);
  }

  paymentDrink(id: number): Observable<void> {
    return this.http.get<void>(this.API_URL + 'order/payment/' + id);
  }

  showHistory(curPage: number, numberRecord: number, id: number): Observable<DataResult<IOrderDto>> {
    return this.http.get<DataResult<IOrderDto>>(this.API_URL + 'order/history/' + id
      + '?page=' + (curPage - 1) + '&size=' + numberRecord);
  }
}
