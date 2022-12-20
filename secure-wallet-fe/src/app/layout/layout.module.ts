import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmptyLayoutModule } from './empty/empty.module';
import { LayoutComponent } from './layout.component';
import { ModernLayoutModule } from './modern/modern.module';


const layoutModules = [
    // Empty
    EmptyLayoutModule,
    ModernLayoutModule,


];

@NgModule({
    declarations: [
        LayoutComponent,
    
    ],
    imports     : [
        SharedModule,
        ...layoutModules
    ],
    exports     : [
        LayoutComponent,
        ...layoutModules
    ]
})
export class LayoutModule
{
}
