import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/backend-api/account/account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AccountService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.forgotForm = this._formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],

    });
  }


  forgot() {
    if (!this.forgotForm.valid) {
      return;
    }
    this.forgotForm.disable();
    this._authService.forgot(this.forgotForm.get('Email')?.value).subscribe({
      next: (response) => {

      },
      error: (error) => {

      }
    })
  }
}
