import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ThemeConfirmationModule } from '@theme/services/confirmation';
import { ThemeLoadingModule } from '@theme/services/loading';
import { ThemeMediaWatcherModule } from '@theme/services/media-watcher/media-watcher.module';
import { ThemePlatformModule } from '@theme/services/platform/platform.module';
import { ThemeSplashScreenModule } from '@theme/services/splash-screen/splash-screen.module';
import { ThemeUtilsModule } from '@theme/services/utils/utils.module';

@NgModule({
    imports  : [
        ThemeConfirmationModule,
        ThemeLoadingModule,
        ThemeMediaWatcherModule,
        ThemePlatformModule,
        ThemeSplashScreenModule,
        ThemeUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class ThemeModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: ThemeModule)
    {
        if ( parentModule )
        {
            throw new Error('ThemeModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
