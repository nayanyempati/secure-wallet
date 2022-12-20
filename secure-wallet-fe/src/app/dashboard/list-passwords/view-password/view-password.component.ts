import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-view-password',
  templateUrl: './view-password.component.html',
  styleUrls: ['./view-password.component.scss'],
})
export class ViewPasswordComponent implements OnInit {
  updatePasswordForm!: FormGroup
  Token!: string
  passwordDetails!: PasswordModel;
  data!: any;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private modalCtrl: ModalController,
    private _matSnack: MatSnackBar,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.view(this.data.Token)
    this.updatePasswordForm = this.fb.group({
      Title: [this.data.Title, [Validators.required]],
      Url: [this.data.Url, [Validators.required]],
      Email: [this.data.Email, [Validators.required]],
      Password1: [this.view(this.data.Token), [Validators.required]],
      Notes: [this.data.Notes],
    });
  }

  view(token: string) {
    this._passwordService.viewpasswords(token).subscribe({
      next: (response) => {
        let password = response.Password1;
        this.passwordDetails = response;
        this.updatePasswordForm = this.updatePasswordValueForm();
      }
    })
  }

  updatePasswordValueForm(): FormGroup {
    return this.fb.group({
      Title: [this.passwordDetails.Title],
      Email: [this.passwordDetails.Email],
      Password1: [this.passwordDetails.Password1],
      Url: [this.passwordDetails.Url],
      Notes: [this.passwordDetails.Notes],
    })
  }



  close() {
    this.modalCtrl.dismiss();
  }

  async updatePassword() {
    if (!this.updatePasswordForm.valid) {
      const alert = await this.alertController.create({
        header: 'warning',
        message: "Enter required field",
        buttons: [
          {
            text: 'Ok',
          }
        ],
      });
      alert.present();
      return;
    }
    this._passwordService.updatepassword(this.updatePasswordForm.value, this.data.Token).subscribe({
      next: async (response) => {
        if (response.Status == "success") {
          const alert = await this.alertController.create({
            header: response.Status,
            message: response.Message,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.modalCtrl.dismiss();
                }
              }
            ],
          });
          alert.present();
        }
      },
      error: async (error) => {
        const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Missing mandatory fields',
          buttons: [
            {
              text: 'Ok',
            }
          ],
        });
        alert.present();
      }
    })
  }

  async delete() {
    const alert = await this.alertController.create({
      header: "Delete",
      message: "Are you sure you want to delete the password?",
      buttons: [
        {
          text: 'Delete',
          cssClass: 'bg-red-600 text-white',
          handler: () => {
            this._passwordService.deletepasswords(this.data.Token).subscribe({
              next: (response) => {
                this._matSnack.open(response.Message, 'End now', {
                  duration: 1500,
                  panelClass: response.Status,
                  horizontalPosition: 'center',
                  verticalPosition: 'bottom',
                });
                this.modalCtrl.dismiss();
              }
            })
          },

        },
        {
          text: 'Cancel',
          cssClass: 'bg-green-600 text-white',
          handler: () => {
            this.modalCtrl.dismiss();
          },

        }
      ],
    });
    alert.present();
  }
}

export class PasswordModel {
  Title!: string
  Url!: string
  Email!: string
  Password1!: string
  Notes!: string

}
