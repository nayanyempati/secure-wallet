import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ThemeLoadingInterceptor } from '@theme/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: ThemeLoadingInterceptor,
            multi   : true
        }
    ]
})
export class ThemeLoadingModule
{
}
