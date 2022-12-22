import {Component, OnInit} from '@angular/core';
import {IDrinkDto} from '../../../dto/idrink-dto';
import {DrinkService} from '../../../service/drink.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-drink',
  templateUrl: './detail-drink.component.html',
  styleUrls: ['./detail-drink.component.css']
})
export class DetailDrinkComponent implements OnInit {
  drink: IDrinkDto;
  id: number;
  content: boolean;
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  quantityChoose = 1;
  idUser: number;

  constructor(private drinkService: DrinkService,
              private title: Title,
              private activatedRoute: ActivatedRoute,
              private tokenService: TokenStorageService) {
    this.title.setTitle('Detail information');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(value => {
      console.log(value);
      this.id = +Number(value.get('id'));
      this.drinkService.getDrinkById(this.id).subscribe(pro => {
        window.scroll(0, 0);
        if (pro != null) {
          this.content = true;
          this.drink = pro;
        } else {
          this.content = false;
        }
      });
    });
    this.showUsername();
  }

  private showUsername() {
    if (this.tokenService.isLogged()) {
      this.username = this.tokenService.getUser().username;
      this.getCustomer();
      this.roles = this.tokenService.getUser().roles;
      this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
      this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
      this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
    }
  }

  private getCustomer() {
    this.drinkService.findAllCustomer(this.username).subscribe(value => {
      this.idUser = value.id;
      console.log(this.idUser);
    });
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
