import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { UploadService } from 'src/app/backend-api/upload/upload.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.scss'],
})
export class ChangePictureComponent implements OnInit {
  user: any
  Photo!: string
  loading: any;
  fileToUpload: File[] = [];
  options: CameraOptions = {
    quality: 100,
    destinationType: this._camera.DestinationType.DATA_URL,
    encodingType: this._camera.EncodingType.JPEG,
    mediaType: this._camera.MediaType.PICTURE
  }

  constructor(private modalCtrl: ModalController,
    private _camera: Camera,
    private _accountService: AccountService,
    private alertController: AlertController, public loadingController: LoadingController,
    private _uploadService: UploadService) {



  }

  ngOnInit() { this.userDetails(); }
  close() {
    this.modalCtrl.dismiss();
  }


  userDetails() {
    this._accountService.userDetails().subscribe({
      next: (response) => {
        this.user = response;
        this.Photo = response.Photo;
      }
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3500
    });
    await this.loading.present();
  }

  uploadSelectedPhoto(files: any) {
    this.presentLoading();
    this.fileToUpload.push(files.target.files[0])
    this._uploadService.UploadFile(this.fileToUpload).subscribe({
      next: async (response) => {
        this.loading.dismiss();
        if (response.Status == "success") {
          this.userDetails();
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
          header: 'Oops',
          message: "Something went wrong.. Try again later",
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

  takePicture() {
    this._camera.getPicture(this.options).then(async (imageData) => {
    const base64Response = await fetch(`data:image/jpeg;base64,${imageData}`);
    const blob = await base64Response.blob();
    this.presentLoading();
    this._uploadService.UploadFileBlob(blob).subscribe({
      next: async (response) => {
        this.loading.dismiss();;
        if (response.Status == "success") {
          this.userDetails();
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
          header: 'Oops',
          message: "Something went wrong.. Try again later",
          buttons: [
            {
              text: 'Ok',
            }
          ],
        });
        alert.present();
      }
    })
  }, (err) => {
    // Handle error
  });
  }
}
