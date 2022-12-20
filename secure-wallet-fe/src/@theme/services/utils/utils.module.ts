import { NgModule } from '@angular/core';
import { ThemeUtilsService } from '@theme/services/utils/utils.service';

@NgModule({
    providers: [
        ThemeUtilsService
    ]
})
export class ThemeUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _themeUtilsService: ThemeUtilsService)
    {
    }
}
