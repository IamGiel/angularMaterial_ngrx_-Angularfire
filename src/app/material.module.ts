import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatNativeDateModule, MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class MaterialModule { }
