import {Component, OnInit} from '@angular/core';
import {ICustomer} from '../../../model/i-customer';
import {DrinkService} from '../../../service/drink.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  customer: ICustomer;
  username: string;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;

  constructor(private drinkService: DrinkService,
              private tokenService: TokenStorageService,
              private router: Router,
              private title: Title) {
    title.setTitle('Customer information');
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

    if (this.username !== '' && this.username !== undefined) {
      this.drinkService.findAllCustomer(this.username).subscribe(customer => {
          if (customer != null) {
            this.customer = customer;
          }
        },
        error => {
          console.log(error);
        });
    }
  }
}
