import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeLoadingBarModule } from 'src/@theme/components/loading-bar/loading-bar.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmptyLayoutComponent } from './empty.component';


@NgModule({
    declarations: [
        EmptyLayoutComponent
    ],
    imports     : [
        RouterModule,
        ThemeLoadingBarModule,
        SharedModule
    ],
    exports     : [
        EmptyLayoutComponent
    ]
})
export class EmptyLayoutModule
{
}
