import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeFullscreenModule } from 'src/@theme/components/fullscreen/fullscreen.module';
import { ThemeLoadingBarModule } from 'src/@theme/components/loading-bar/loading-bar.module';
import { ThemeNavigationModule } from 'src/@theme/components/navigation/navigation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModernLayoutComponent } from './modern.component';


@NgModule({
    declarations: [
        ModernLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        ThemeFullscreenModule,
        ThemeLoadingBarModule,
        ThemeNavigationModule,
        SharedModule
    ],
    exports     : [
        ModernLayoutComponent
    ]
})
export class ModernLayoutModule
{
}
