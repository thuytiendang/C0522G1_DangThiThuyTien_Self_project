import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IDrinkDto} from '../../../dto/idrink-dto';
import {DrinkService} from '../../../service/drink.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalPage = 0;
  numberPage = 0;
  totalRecord = 0;
  drinkList: IDrinkDto[];
  moreDrinkList: IDrinkDto[];
  action: boolean;
  nameSearch = '';
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  quantityChoose = 1;
  idUser: number;

  constructor(private drinkService: DrinkService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getAllDrink(this.numberPage);
    this.showUsername();
  }

  showUsername() {
    if (this.tokenService.isLogged()) {
      this.username = this.tokenService.getUser().username;
      this.getCustomer();
      this.roles = this.tokenService.getUser().roles;
      this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
      this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
      this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
    }
  }

  getCustomer() {
    this.drinkService.findAllCustomer(this.username).subscribe(value => {
      this.idUser = value.id;
      console.log(this.idUser);
    });
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

  addToCart(drinkId: number): void {
      this.drinkService.addToCart(this.quantityChoose, this.idUser, drinkId).subscribe(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Add to cart successfully!'
        }).then(r => {
          location.reload();
        });
      }, error => {
      });
    }
}
