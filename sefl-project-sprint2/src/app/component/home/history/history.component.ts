import { Component, OnInit } from '@angular/core';
import {IOrderDto} from '../../../dto/iorder-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {DrinkService} from '../../../service/drink.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  page = 1;
  pageSize = 3;
  historyList$: Observable<IOrderDto[]>;
  totalPage: number;

  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private drinkService: DrinkService,
              private router: Router,
              private tokenService: TokenStorageService,
              private title: Title) {
    title.setTitle('History');
  }

  ngOnInit(): void {
    this.username = '';
    this.showUsername();
  }

  showUsername() {
    this.username = this.tokenService.getUser().username;
    console.log(this.username);
    this.roles = this.tokenService.getUser().roles;
    this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
    this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
    this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;

    if (this.username !== '') {
      this.drinkService.findAllCustomer(this.username).subscribe(customer => {
          if (customer != null) {
            this.drinkService.showHistory(this.page, this.pageSize, customer.id).subscribe(value => {
                this.historyList$ = new BehaviorSubject<IOrderDto[]>(value.content);
                this.totalPage = Math.ceil(value.totalElements / this.pageSize);
              },
              error => {
                console.log(error);
              });
          }
        },
        error => {
          console.log(error);
        });
    }
  }

  previous(): void {
    this.page--;
    this.showUsername();
  }

  next(): void {
    this.page++;
    this.showUsername();
  }

  getPage1(): void {
    this.page = 1;
    this.showUsername();
  }

  getPageEnd(): void {
    this.page = this.totalPage;
    this.showUsername();
  }

  getPageP(): void {
    this.page -= 2;
    this.showUsername();
  }

  getPageN(): void {
    this.page += 2;
    this.showUsername();
  }
}
