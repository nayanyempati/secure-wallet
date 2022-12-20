import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Route, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { IonicModule } from '@ionic/angular';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,

      },
      {
        path: ':id/activate',
        component: ActivateAccountComponent,
      },
      {
        path: ':id/reset',
        component: ResetPasswordComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    AccountComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    ActivateAccountComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class AccountModule { }
