import { NgModule } from '@angular/core';
import { ThemeScrollbarDirective } from '@theme/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        ThemeScrollbarDirective
    ],
    exports     : [
        ThemeScrollbarDirective
    ]
})
export class ThemeScrollbarModule
{
}
