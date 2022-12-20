import { NgModule } from '@angular/core';
import { ThemeScrollResetDirective } from '@theme/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        ThemeScrollResetDirective
    ],
    exports     : [
        ThemeScrollResetDirective
    ]
})
export class ThemeScrollResetModule
{
}
