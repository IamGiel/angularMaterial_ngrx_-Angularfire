import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  AbstractControl
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material';
import { AuthService } from 'src/app/service/auth.service';
import { AuthData } from 'src/app/models/auth-data.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailVal: any;
  JSON;
  originalPw;
  retypedPw;
  notSamePassword: boolean;
  signupForm:any;
  credentials:AuthData;

  createForm(){
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{3,}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      vrfy_password: ['', Validators.required],
      date: ['', Validators.required],
      checked: [null, Validators.required],
    }, { validator: this.checkPasswords });
  }
  
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('vrfy_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {}

  valid(object) {
    if (object === undefined || object === null) {
      // alert(object)
      return false;
    } else {
      return true;
    }
  }

  startDate = new Date(2001, 11, 1);

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    const year = d.getFullYear();
    // console.log(year)

    // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;

    // prevent years later than 2001
    return year < 2002 
  }

  get f() {
    // console.log(this.signupForm.controls.email)
    // console.log(this.signupForm.controls.password.value.length)
    return this.signupForm.controls;
  }

  onSubmit() {
    // console.log(this.signupForm.valid);
    this.authService.registerUser({
      userName:this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })
  }

  login(){
    this.router.navigateByUrl('/login')
  }

  

}

export class MyErrorStateMatcher implements ErrorStateMatcher {

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.parent.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.parent.touched);
    // console.log("control.parent: " + JSON.stringify(control, this.getCircularReplacer(), 4) + " invalidParent: " + invalidParent);

    return control.parent.errors && control.parent.errors && control.touched && (invalidCtrl || invalidParent);
  }



  // JSON.stringify(circularReference, getCircularReplacer());
}
