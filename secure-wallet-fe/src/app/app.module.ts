import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appConfig } from './core/config/app.config';
import { CoreModule } from './core/core.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ModernLayoutComponent } from './layout/modern/modern.component';
import { EmptyLayoutComponent } from './layout/empty/empty.component';
import { Camera } from '@ionic-native/camera/ngx';
import { ChangePictureComponent } from './dashboard/my-profile/change-picture/change-picture.component';
import { RouteReuseStrategy } from '@angular/router';






@NgModule({
  declarations: [
    AppComponent,
    ModernLayoutComponent,
    EmptyLayoutComponent,
 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    MatSnackBarModule,
    HttpClientModule ,
  ],
  providers: [
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
