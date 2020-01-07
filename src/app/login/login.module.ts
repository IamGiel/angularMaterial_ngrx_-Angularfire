import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';

const loginRoutes: Route[] = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [MaterialModule, SharedModule, RouterModule.forChild(loginRoutes)],
  exports: []
})
export class LoginModule {}
