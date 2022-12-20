import { NgModule } from '@angular/core';
import { ThemeSplashScreenService } from '@theme/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        ThemeSplashScreenService
    ]
})
export class ThemeSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _themeSplashScreenService: ThemeSplashScreenService)
    {
    }
}
