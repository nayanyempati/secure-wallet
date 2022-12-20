import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ListPasswordsComponent } from './list-passwords/list-passwords.component';
import { AddPasswordsComponent } from './list-passwords/add-passwords/add-passwords.component';
import { EditPasswordsComponent } from './list-passwords/edit-passwords/edit-passwords.component';
import { AddCardsComponent } from './list-cards/add-cards/add-cards.component';
import { EditCardsComponent } from './list-cards/edit-cards/edit-cards.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { ViewCardComponent } from './list-cards/view-card/view-card.component';
import { ViewPasswordComponent } from './list-passwords/view-password/view-password.component';
import { Route, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { IonicModule } from '@ionic/angular';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './my-profile/change-password/change-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { ChangePictureComponent } from './my-profile/change-picture/change-picture.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'listpasswords',
        component: ListPasswordsComponent,
      },
      {
        path: 'addpassword',
        component: AddPasswordsComponent,
      },
      {
        path: ':id/editpassword',
        component: EditPasswordsComponent,

      },
      {
        path: ':id/view',
        component: ViewPasswordComponent,

      },
      {
        path: 'listcards',
        component: ListCardsComponent,
      },
      {
        path: 'addcard',
        component: AddCardsComponent,
      },
      {
        path: ':id/editcard',
        component: EditCardsComponent,
      },
      {
        path: ':id/view',
        component: ViewCardComponent,
      },
      {
        path: 'my-profile',
        component: MyProfileComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ListPasswordsComponent,
    AddPasswordsComponent,
    EditPasswordsComponent,
    ViewPasswordComponent,
    ListCardsComponent,
    AddCardsComponent,
    EditCardsComponent,
    ViewCardComponent,
    MyProfileComponent,
    ChangePasswordComponent,
    ChangePictureComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
    MatRippleModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
})
export class DashboardModule { }
