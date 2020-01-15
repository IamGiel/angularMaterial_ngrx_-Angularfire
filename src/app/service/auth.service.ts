import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthData } from '../models/auth-data.model';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private user: User;
  
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
    ) { }

  initAuthListener(){
    this.afAuth.authState.subscribe(user=> {
      console.log(user);
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true)
        this.router.navigate(['/dashboard']);
      } else if (!user) {
        this.user = null;
        this.afAuth.auth.signOut();
        this.authChange.next(false);
        this.router.navigate(['/']);
        this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result)
        this.isAuthenticated = true;
        this.router.navigateByUrl('/dashboard')
      })
      .catch(error => {
        this.isAuthenticated = false;
        console.log(error);
      });
  }
  
  login(authData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.router.navigateByUrl('/')
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
