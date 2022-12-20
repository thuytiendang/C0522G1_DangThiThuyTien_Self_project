import {IDrink} from './i-drink';
import {ICustomer} from './i-customer';

export interface IOrder {
  id?: number;
  quantity?: number;
  datePayment?: string;
  drink?: IDrink;
  customer?: ICustomer;
}
