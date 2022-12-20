import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeHighlightComponent } from '@theme/components/highlight/highlight.component';

@NgModule({
    declarations: [
        ThemeHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        ThemeHighlightComponent
    ]
})
export class ThemeHighlightModule
{
}
