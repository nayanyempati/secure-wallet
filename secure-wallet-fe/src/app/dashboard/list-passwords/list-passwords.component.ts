import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordService } from 'src/app/backend-api/password/password.service';
import { AddPasswordsComponent } from './add-passwords/add-passwords.component';
import { ViewPasswordComponent } from './view-password/view-password.component';

@Component({
  selector: 'app-list-passwords',
  templateUrl: './list-passwords.component.html',
  styleUrls: ['./list-passwords.component.scss'],
})
export class ListPasswordsComponent implements OnInit {
  passwordLists: any;
  showIcon: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private _passwordService: PasswordService
  ) { this.listPasswords(); }

  ngOnInit() { }


  onSearchPassword(key: any) {
    if(key){
      this._passwordService.searchPassword(key).subscribe({
        next: (response) => {
          this.passwordLists = response;
        }
      })
    }
    this.listPasswords();
  }

  listPasswords() {
    this._passwordService.listpasswords().subscribe({
      next: (response) => {
        this.passwordLists = response;
      }
    })
  }

  async viewPassword(password: any) {
    const modal = await this.modalCtrl.create({
      component: ViewPasswordComponent,
      componentProps: {
        data: password
      }
    });
    modal.onDidDismiss().then(data => {
      this.listPasswords()
    });
    return await modal.present();
  }
  async addPassword() {
    const modal = await this.modalCtrl.create({
      component: AddPasswordsComponent,
    });
    modal.onDidDismiss().then(data => {
      this.listPasswords()
    });
    return await modal.present();
  }


  trackByFn(index: number, item: any): any {
    return item.id || index;
  }


  getTitle(password: any) {
    let url = password.Url;
    if (url.includes('facebook')) {
      return null;
    }
    if (url.includes('apple')) {
      return null;
    }
    if (url.includes('netflix')) {
      return null;
    }
    if (url.includes('google')) {
      return null;
    }
    if (url.includes('gmail')) {
      return null;
    }
    if (url.includes('instagram')) {
      return null;
    }
    if (url.includes('twitter')) {
      return null;
    }
    if (url.includes('snapshot')) {
      return null;
    }
    if (url.includes('tiktok')) {
      return null;
    }
    if (url.includes('microsoft')) {
      return null;
    }
    if (url.includes('dropbox')) {
      return null;
    }
    if (url.includes('ebay')) {
      return null;
    }
    if (url.includes('facebook')) {
      return null;
    }
    this.showIcon = true;
    return "<div class='p-4 text-white text-2xl text-center shadow-sm bg-gray-900 w-16 h-16 rounded-full'>" + password.Title.substring(0, 1) + "</div>"

  }
}
