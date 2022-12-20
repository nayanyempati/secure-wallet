import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { ChangePasswordComponent } from '../my-profile/change-password/change-password.component';
import { ChangePictureComponent } from '../my-profile/change-picture/change-picture.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  user: any;
  constructor(private _accountService: AccountService,
    private _router: Router,
    private modalCtrl: ModalController,) {this.userDetails(); }

  ngOnInit() { }


  userDetails() {
    this._accountService.userDetails().subscribe({
      next: (response) => {
        this.user = response;
      }
    })
  }

  logout() {
    localStorage.clear();
    this._accountService.signOut();
    this._router.navigate(['/account/signin'])
  }

  async myProfile() {
    const modal = await this.modalCtrl.create({
      component: MyProfileComponent,
    });
    modal.onDidDismiss().then(data => {

    });
    return await modal.present();
  }

  async changePassword() {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordComponent,
    });
    modal.onDidDismiss().then(data => {

    });
    return await modal.present();
  }

  async changePicture() {
    const modal = await this.modalCtrl.create({
      component: ChangePictureComponent,
    });
    modal.onDidDismiss().then(data => {
      this.userDetails();

    });
    return await modal.present();
  }
}
