import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { CardService } from 'src/app/backend-api/card/card.service';
import { PasswordService } from 'src/app/backend-api/password/password.service';

@Component({
  selector: 'app-add-cards',
  templateUrl: './add-cards.component.html',
  styleUrls: ['./add-cards.component.scss'],
})
export class AddCardsComponent implements OnInit {
  addCardForm!: FormGroup
  constructor(private _passwordService: PasswordService,
    private alertController: AlertController,
    private _accountService: AccountService,
    private _CardService: CardService,
    private modalCtrl: ModalController,
    private fb: FormBuilder) {

  }

  ngOnInit() {

    this.addCardForm = this.fb.group({
      CardNumber: [null, [Validators.required]],
      CardName: [null, [Validators.required]],
      Expiry: [null, [Validators.required]],
    });
  }


  close() {
    this.modalCtrl.dismiss();
  }

  async createCard() {
    if (!this.addCardForm.valid) {
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
    this._CardService.addCard(this.addCardForm.value).subscribe({
      next: async (response) => {
        if (response.Status == "success") {
          this.addCardForm.reset();
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

