import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IDrinkDto} from '../../../dto/idrink-dto';
import {DrinkService} from '../../../service/drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {
  drink$: BehaviorSubject<IDrinkDto>;
  totalPage = 0;
  numberPage = 0;
  totalRecord = 0;
  drinkList: IDrinkDto[];
  moreDrinkList: IDrinkDto[];
  action: boolean;
  nameSearch = '';

  constructor(private drinkService: DrinkService) {
  }

  ngOnInit(): void {
    this.getAllDrink(this.numberPage);
  }

  getAllDrink(numberA: number) {
    this.drinkService.getAllDrink(numberA, this.nameSearch).subscribe(value => {
      if (value != null) {
        this.action = true;
        this.totalRecord = value.totalElements;
        this.totalPage = value.totalPages;
        if (numberA > 0) {
          this.moreDrinkList = this.drinkList;
          this.drinkList = this.moreDrinkList.concat(value.content);
        } else {
          this.drinkList = value.content;
        }
      } else {
        this.action = false;
      }
    });
  }

  loadMore() {
    this.numberPage += 1;
    this.getAllDrink(this.numberPage);
  }


  search() {
    this.getAllDrink(this.numberPage);
  }
}
