import { ModuleWithProviders, NgModule } from '@angular/core';
import { ThemeConfigService } from '@theme/services/config/config.service';
import { THEME_APP_CONFIG } from '@theme/services/config/config.constants';

@NgModule()
export class ThemeConfigModule
{
    /**
     * Constructor
     */
    constructor(private _themeConfigService: ThemeConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<ThemeConfigModule>
    {
        return {
            ngModule : ThemeConfigModule,
            providers: [
                {
                    provide : THEME_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
