import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccountService } from 'src/app/backend-api/account/account.service';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
    imports  : [
        HttpClientModule
    ],
    providers: [
        AccountService,
        {
            provide : HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi   : true
        }
    ]
})
export class AuthModule
{
}
