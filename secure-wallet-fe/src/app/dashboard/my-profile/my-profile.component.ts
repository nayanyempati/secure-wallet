import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IonModal, AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  profileForm!: FormGroup
  user!: User;
  @ViewChild(IonModal) modal!: IonModal;
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private _userDetails: AccountService) {
    this.userDetails();

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      Email: new FormControl(null, Validators.compose([Validators.required])),
      FirstName: [null, [Validators.required]],
      LastName: [null, [Validators.required]],
    });
  }


  userDetails() {
    this._userDetails.userDetails().subscribe({
      next
        : (response) => {
          this.user = response;
          this.profileForm = this.updateProfileForm();
        }
    })
  }

  updateProfileForm(): FormGroup {
    return this.fb.group({
      Email: [this.user.Email],
      FirstName: [this.user.FirstName],
      LastName: [this.user.LastName],
    })
  }



  close() {
    this.modalCtrl.dismiss();
  }

  async updateProfile() {
    if (!this.profileForm.valid) {
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
    this._accountService.updateProfile(this.profileForm.value).subscribe({
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

}
export class User {
  FirstName!: string
  LastName!: string
  Email!: string

}