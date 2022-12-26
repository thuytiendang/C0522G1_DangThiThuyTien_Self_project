import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {DrinkService} from '../../../service/drink.service';
import {IOrderDto} from '../../../dto/iorder-dto';
import Swal from 'sweetalert2';
import {render} from 'creditcardpayments/creditCardPayments';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  cart: IOrderDto[];
  totalPrice = 0;
  finalPrice = 0;
  countDrink: number;
  paypalPrice = 0;

  constructor(private tokenService: TokenStorageService,
              private drinkService: DrinkService,
              private title: Title) {
    title.setTitle('Cart');
  }

  ngOnInit(): void {
    this.showUsername();
    this.getCustomer();
  }

  showUsername() {
    if (this.tokenService.isLogged()) {
      this.username = this.tokenService.getUser().username;
      this.roles = this.tokenService.getUser().roles;
      this.isCustomer = this.roles.indexOf('ROLE_CUSTOMER') !== -1;
      this.isEmployee = this.roles.indexOf('ROLE_EMPLOYEE') !== -1;
      this.isAdmin = this.roles.indexOf('ROLE_ADMIN') !== -1;
    }
  }

  getCustomer(): void {
    this.drinkService.findAllCustomer(this.username).subscribe(customer => {
      this.drinkService.getCount(customer.id).subscribe(value1 => {
        this.countDrink = value1.countDrink;
      });
      if (customer != null) {
        this.drinkService.listCart(customer.id).subscribe(value => {
          this.cart = value;
          for (const item of value) {
            this.totalPrice += item.price * item.quantity;
            this.finalPrice += item.price * (1 - item.discount / 100) * item.quantity;
          }

          this.paypalPrice = Math.round(this.finalPrice / 23000 * 100) / 100;
          render(
            {
              id: '#myPaypal',
              value: '' + this.paypalPrice,
              currency: 'USD',
              onApprove: (details) => {
                this.drinkService.paymentDrink(customer.id).subscribe(value1 => {
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
                    title: 'Payment successfully!'
                  }).then(r => window.location.reload());
                });
              }
            }
          );
        });
      }
    });
  }

  deleteCart(id: number): void {
    Swal.fire({
      title: 'warning',
      text: 'Are you sure to remove this product from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        this.drinkService.deleteCart(id).subscribe(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'success',
            title: 'Removed from cart successfully!'
          });
          location.reload();
        }, error => {
        });
      }
    });
  }

  ascQuantity(id: number): void {
    console.log(id);
    this.drinkService.ascQuantity(id).subscribe(value => {
      location.reload();
    });
  }


  descQuantity(id: number): void {
    this.drinkService.descQuantity(id).subscribe(value => {
      location.reload();
    });
  }
}
