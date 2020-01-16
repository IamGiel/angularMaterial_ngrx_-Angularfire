import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';
import { catchError, map } from 'rxjs/operators';
import { FetchDataService } from './fetch-data-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Courts } from '../models/court.model';


@Injectable({
  providedIn: 'root'
})
export class CourtResolverService implements Resolve<any> {
  Courts;

  constructor(private service: FetchDataService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
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
