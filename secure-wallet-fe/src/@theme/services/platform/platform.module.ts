import { NgModule } from '@angular/core';
import { ThemePlatformService } from '@theme/services/platform/platform.service';

@NgModule({
    providers: [
        ThemePlatformService
    ]
})
export class ThemePlatformModule
{
    /**
     * Constructor
     */
    constructor(private _themePlatformService: ThemePlatformService)
    {
    }
}
