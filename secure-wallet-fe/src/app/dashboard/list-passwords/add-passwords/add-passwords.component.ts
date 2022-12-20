import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-add-passwords',
  templateUrl: './add-passwords.component.html',
  styleUrls: ['./add-passwords.component.scss'],
})
export class AddPasswordsComponent implements OnInit {

  addPasswordForm!: FormGroup
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private modalCtrl: ModalController,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.addPasswordForm = this.fb.group({
      Title: new FormControl('', Validators.compose([Validators.required])),
      Url: [null, [Validators.required]],
      Email: [null, [Validators.required]],
      Password1: [null, [Validators.required]],
      Notes: [null],
    });
  }


  close() {
    this.modalCtrl.dismiss();
  }

  async addPassword() {
    if (!this.addPasswordForm.valid) {
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
    this._passwordService.addpassword(this.addPasswordForm.value).subscribe({
      next: async (response) => {
        if (response.Status == "success") {
          this.addPasswordForm.reset();
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
}
