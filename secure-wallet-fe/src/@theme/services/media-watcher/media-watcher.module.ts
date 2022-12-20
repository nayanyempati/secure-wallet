import { NgModule } from '@angular/core';
import { ThemeMediaWatcherService } from '@theme/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        ThemeMediaWatcherService
    ]
})
export class ThemeMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _themeMediaWatcherService: ThemeMediaWatcherService)
    {
    }
}
