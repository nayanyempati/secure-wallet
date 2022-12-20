import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { CardService } from 'src/app/backend-api/card/card.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss'],
})
export class ViewCardComponent implements OnInit {
  editCardForm!: FormGroup
  data:any
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private _CardService: CardService,
    private modalCtrl: ModalController,
    private _matSnack:MatSnackBar,
    private fb: FormBuilder) {

  }

  ngOnInit() {

    this.editCardForm = this.fb.group({
      CardNumber: [this.data.CardNumber, [Validators.required]],
      CardName: [this.data.CardName, [Validators.required]],
      Expiry: [this.data.Expiry, [Validators.required]],
    });
  }


  close() {
    this.modalCtrl.dismiss();
  }

  async update() {
    if (!this.editCardForm.valid) {
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
    this._CardService.updateCard(this.editCardForm.value, this.data.Token).subscribe({
      next: async (response) => {
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
      message: "Are you sure you want to delete the card?",
      buttons: [
        {
          text: 'Delete',
          cssClass: 'bg-red-600 text-white',
          handler: () => {
            this._CardService.deleteCards(this.data.Token).subscribe({
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

