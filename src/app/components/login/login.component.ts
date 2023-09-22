import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  loading = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get emailErrors() {
    return (
      Boolean(this.form.controls['email'].errors) &&
      this.form.controls['email'].touched
    );
  }

  get passwordErrors() {
    return (
      Boolean(this.form.controls['password'].errors) &&
      this.form.controls['password'].touched
    );
  }

  submit() {
    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: (data) => {
        this.loading = false;

        localStorage.setItem('token', data.token);
        localStorage.setItem('refresh_token', data.refresh_token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.toastr.error('Something went wrong');
      },
    });
  }
}
