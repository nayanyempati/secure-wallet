import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ThemeConfirmationService } from '@theme/services/confirmation/confirmation.service';
import { ThemeConfirmationDialogComponent } from '@theme/services/confirmation/dialog/dialog.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ThemeConfirmationDialogComponent
    ],
    imports     : [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CommonModule
    ],
    providers   : [
        ThemeConfirmationService
    ]
})
export class ThemeConfirmationModule
{
    /**
     * Constructor
     */
    constructor(private _themeConfirmationService: ThemeConfirmationService)
    {
    }
}
