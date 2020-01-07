import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './layout/home/home.component';
import { AnonymousUserGuard } from './security/anonymous-user.guard';
import { PageNotFoundComponent } from './layout/error/page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'login',
    canActivate: [AnonymousUserGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
