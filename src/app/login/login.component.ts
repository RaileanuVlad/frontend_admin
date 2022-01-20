import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public loginInvalid = false;
  returnUrl: string;
  private formSubmitAttempt = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/preview']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      parola: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.formSubmitAttempt = true;
      return;
    }


    this.authService.login(this.f.email.value, this.f.parola.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/preview']);
        },
        error => {
          this.loginInvalid = true;
        });
  }

}
