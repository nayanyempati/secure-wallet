import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDrawerComponent } from '@theme/components/drawer/drawer.component';

@NgModule({
    declarations: [
        ThemeDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        ThemeDrawerComponent
    ]
})
export class ThemeDrawerModule
{
}
