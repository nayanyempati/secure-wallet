import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ThemeLoadingBarComponent } from '@theme/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        ThemeLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        ThemeLoadingBarComponent
    ]
})
export class ThemeLoadingBarModule
{
}
