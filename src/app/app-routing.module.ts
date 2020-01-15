import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HowItWorksComponent } from './welcome/how-it-works/how-it-works.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "how-it-works", component: HowItWorksComponent }
];

@NgModule({
    imports: [
       RouterModule.forRoot(routes) 
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
    providers: [AuthGuard]
})
export class AppRoutingModule {}