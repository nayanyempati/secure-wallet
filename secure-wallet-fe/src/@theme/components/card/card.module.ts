import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeCardComponent } from '@theme/components/card/card.component';

@NgModule({
    declarations: [
        ThemeCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        ThemeCardComponent
    ]
})
export class ThemeCardModule
{
}
