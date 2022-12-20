import { NgModule } from '@angular/core';
import { ThemeFindByKeyPipe } from '@theme/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        ThemeFindByKeyPipe
    ],
    exports     : [
        ThemeFindByKeyPipe
    ]
})
export class ThemeFindByKeyPipeModule
{
}
