import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataResult} from '../dto/data-result';
import {IDrinkDto} from '../dto/idrink-dto';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private API_URL = environment.api_url;

  constructor(private http: HttpClient) {
  }

  getAllDrink(page: number, nameSearch: string): Observable<DataResult<IDrinkDto>> {
    return this.http.get<DataResult<IDrinkDto>>(this.API_URL + 'api/drink/list?page=' + page + '&nameSearch=' + nameSearch);
  }
}
