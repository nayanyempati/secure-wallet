import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  changePaswordForm!: FormGroup
  user!: User;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private _userDetails: AccountService) {


  }

  ngOnInit() {
    this.changePaswordForm = this.fb.group({
      OldPassword: [null, [Validators.required]],
      NewPassword: [null, [Validators.required]],
    });
  }





  close() {
    this.modalCtrl.dismiss();
  }

  async changePassword() {

    if (!this.changePaswordForm.valid) {
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
    this._accountService.changePassword(this.changePaswordForm.value).subscribe({
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
        }else{
          const alert = await this.alertController.create({
            header: response.Status,
            message: response.Message,
            buttons: [
              {
                text: 'Ok',
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

}
export class User {
  FirstName!: string
  LastName!: string
  Email!: string

}