import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeAlertComponent } from '@theme/components/alert/alert.component';

@NgModule({
    declarations: [
        ThemeAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        ThemeAlertComponent
    ]
})
export class ThemeAlertModule
{
}
