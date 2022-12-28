import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';
import Swal from 'sweetalert2';
import {DrinkService} from '../../service/drink.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  roles: string[] = [];
  isCustomer = false;
  isAdmin = false;
  isEmployee = false;
  username = '';
  countDrink: number;

  constructor(private tokenService: TokenStorageService,
              private drinkService: DrinkService,
              private router: Router) {
  }

  ngOnInit(): void {
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

  whenLogout() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Sign out successfully!',
      showConfirmButton: false,
      timer: 1000
    });
    this.tokenService.logOut();
    this.router.navigateByUrl('');
    window.scroll(0, 0);
    this.username = '';
    this.isCustomer = false;
    this.isEmployee = false;
    this.isAdmin = false;
  }

  getCustomer() {
    this.drinkService.findAllCustomer(this.username).subscribe(value => {
      this.drinkService.getCount(value.id).subscribe(value1 => {
        this.countDrink = value1.countDrink;
      });
    });
  }

}
