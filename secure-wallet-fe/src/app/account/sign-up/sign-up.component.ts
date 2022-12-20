import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer ,Subject } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { CommonService } from 'src/app/backend-api/common/common.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup
  countdown: number = 2;
  countdownMapping: any = {
    '=1': '# second',
    'other': '# seconds'
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AccountService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _commonService: CommonService
  ) { }

  ngOnInit() {
    // Create the form
    this.registerForm = this._formBuilder.group({
      FirstName: [null, Validators.required],
      LastName: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, Validators.required],

    });
  }


  register() {
    if (!this.registerForm.valid) {
      return;
    }
    this.registerForm.disable();
    this._authService.registerAccount(this.registerForm.value).subscribe({
      next: (response) => {
        if (response.Status == "Success") {
          this._commonService.errorHandler(response.Message, response.Status.toLowerCase());
          // Redirect after the countdown
          timer(1000, 1000)
            .pipe(
              finalize(() => {
                this._router.navigate(['/account/signin']);
              }),
              takeWhile(() => this.countdown > 0),
              takeUntil(this._unsubscribeAll),
              tap(() => this.countdown--)
            )
            .subscribe();
        } else {
          this._commonService.errorHandler(response.Message, response.Status.toLowerCase());
          this.registerForm.enable();
        }
      },
      error: (error) => {
        this.registerForm.enable();
        this._commonService.errorHandler('Something went wrong', 'error')
      }
    })
  }
}
