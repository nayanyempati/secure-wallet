import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormGroup, UntypedFormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { CommonService } from 'src/app/backend-api/common/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({

  });
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AccountService,
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _commonService:CommonService
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required],

    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */
  signIn(): void {
    if (!this.signInForm.valid) {
      return;
    }
    this.signInForm.disable();
    this._authService.login(this.signInForm.value).subscribe({
      next: (response) => {
        this.signInForm.enable();
        if (response.Status == "warning") {
          this._commonService.errorHandler(response.Message, response.Status.toLowerCase( ))
        
        }else{
          this._router.navigateByUrl('/dashboard/overview') ;
        }
      },
      error: (error) => {
        this._commonService.errorHandler('Something went wrong', 'error')
        this.signInForm.enable();
      }
    })
  }
}
