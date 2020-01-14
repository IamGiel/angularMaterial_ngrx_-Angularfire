import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Courts } from '../models/court.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class FetchDataService {
  private availableCourts: Courts[] = [];
  courtListsChanged = new Subject<Courts[]>();

  constructor(private db: AngularFirestore) {}

  fetchAllCourtLists() {
    this.db
      .collection("courts")
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()["name"],
            thumb: doc.payload.doc.data()["thumb"],
            numCourts: doc.payload.doc.data()["numCourts"],
            address: doc.payload.doc.data()["address"]
          };
        });
      })
      .subscribe((cl: Courts[]) => {
        this.availableCourts = cl;
        console.log(this.availableCourts);
        this.courtListsChanged.next([...this.availableCourts]);
      });
  }
}
