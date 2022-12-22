import {Component, OnInit} from '@angular/core';
import {IDrinkDto} from '../../../dto/idrink-dto';
import {IPromotion} from '../../../model/i-promotion';
import {DrinkService} from '../../../service/drink.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotionList: IPromotion[];
  morePromotionList: IPromotion[];
  numberRecord = 0;
  content: boolean;
  totalRecord = 0;
  name = '';

  constructor(private drinkService: DrinkService,
              private title: Title) {
    this.title.setTitle('Promotion');
  }

  ngOnInit(): void {
    this.getPromotionList(this.numberRecord);
  }

  getPromotionList(numberP: number) {
    this.drinkService.getAllPromotion(numberP, this.name).subscribe(value => {
      // @ts-ignore
      this.totalRecord = Math.ceil(value.totalElements / 8);
      if (value != null) {
        this.content = true;
        if (this.numberRecord === 0) {
          // @ts-ignore
          this.promotionList = value.content;
        } else {
          // @ts-ignore
          this.morePromotionList = value.content;
          this.promotionList = this.promotionList.concat(this.morePromotionList);
        }
      } else {
        this.content = false;
      }
    });
  }

  loadMore() {
    this.numberRecord += 1;
    this.getPromotionList(this.numberRecord);
  }

  search() {
    this.getPromotionList(this.numberRecord);
  }
}
