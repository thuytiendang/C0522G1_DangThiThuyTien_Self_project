import {IDrinkType} from './i-drink-type';
import {IPromotion} from './i-promotion';

export interface IDrink {
  id?: number;
  name?: string;
  image?: string;
  price?: number;
  drinkType?: IDrinkType;
  promotion?: IPromotion;
}
