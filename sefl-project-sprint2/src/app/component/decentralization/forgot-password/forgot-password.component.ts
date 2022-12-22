import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})


export class ForgotPasswordComponent implements OnInit {
  formForgotPass!: FormGroup;
  isSubmited = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formForgotPass = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]]
    });
  }

  forgotPassword() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Confirming please wait !',
      showConfirmButton: false,
      timer: 2000
    });
    if (this.formForgotPass.valid) {
      this.authService.forgotPassword(this.formForgotPass.get('email').value).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Email sent successfully!',
            showConfirmButton: false,
            timer: 1000
          });
        },
        error => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Email sending failed, please check again!',
            showConfirmButton: false,
            timer: 1000
          });
        }
      );
    }
  }
}
