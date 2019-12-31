import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';

const routes: Routes = [
    {path: '', component: WelcomeComponent },
    {path: 'signup', component: SignupComponent },
    {path: 'login', component: LoginComponent },
    {path: 'training/new', component: NewTrainingComponent },
    { path: 'training/past', component: PastTrainingComponent },
    { path: 'training/current', component: CurrentTrainingComponent },

]

@NgModule({
    imports: [
       RouterModule.forRoot(routes) 
    ],
    exports: [
        RouterModule
    ],
    declarations: [],
    providers: []
})
export class AppRoutingModule {}