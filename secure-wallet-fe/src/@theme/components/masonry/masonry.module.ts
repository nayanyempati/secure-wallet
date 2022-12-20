import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeMasonryComponent } from '@theme/components/masonry/masonry.component';

@NgModule({
    declarations: [
        ThemeMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        ThemeMasonryComponent
    ]
})
export class ThemeMasonryModule
{
}
