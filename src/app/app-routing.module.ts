import { NgModule, Injectable } from "@angular/core";
import {
  Routes,
  RouterModule,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HowItWorksComponent } from "./welcome/how-it-works/how-it-works.component";
import { AuthGuard } from "./service/auth.guard";
import { TableViewComponent } from "./dashboard/table-view/table-view.component";
import { Courts } from "./models/court.model";
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { filter } from "rxjs/operators";
import { map } from "rxjs-compat/operator/map";
import { FetchDataService } from "./service/fetch-data-service.service";
import { CourtResolverService } from './service/court-resolver.service';


@Injectable({
  providedIn: 'root'
})
export class CourtDataResolver implements Resolve < Courts > {

  Courts;

  constructor(private service: FetchDataService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable <any> | Promise <any> | any {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      // const arrayOfObject = [{ id: 1, name: 'john' }, { id: 2, name: 'max' }];

      return this.service.courtListsChanged.subscribe(data => {
        data.filter(x => x.id === id).map(x => {
          console.log(x);
        });
      })
    }

  }
}


const routes: Routes = [{
    path: "",
    component: WelcomeComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "how-it-works",
    component: HowItWorksComponent
  },
  {
    path: "dashboard/table-view/:id/details",
    component: TableViewComponent,
    resolve: {
        courtdetails: CourtResolverService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [AuthGuard, CourtDataResolver]
})
export class AppRoutingModule {}
