import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  goHome(){
    this.router.navigateByUrl('/');
  }

  register(){
    this.router.navigateByUrl('/signup');
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
    this.authService.getLoginStatus().subscribe(status =>{
      console.log(status)
      if (status === 'There is no user record corresponding to this identifier. The user may have been deleted.'){
        this.loginErrorMessage = 'There is no user record corresponding to the entered credentials.';
      }
    });
  }

  

}
