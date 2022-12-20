import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ThemeScrollbarModule } from '@theme/directives/scrollbar/public-api';
import { ThemeHorizontalNavigationBasicItemComponent } from '@theme/components/navigation/horizontal/components/basic/basic.component';
import { ThemeHorizontalNavigationBranchItemComponent } from '@theme/components/navigation/horizontal/components/branch/branch.component';
import { ThemeHorizontalNavigationDividerItemComponent } from '@theme/components/navigation/horizontal/components/divider/divider.component';
import { ThemeHorizontalNavigationSpacerItemComponent } from '@theme/components/navigation/horizontal/components/spacer/spacer.component';
import { ThemeHorizontalNavigationComponent } from '@theme/components/navigation/horizontal/horizontal.component';
import { ThemeVerticalNavigationAsideItemComponent } from '@theme/components/navigation/vertical/components/aside/aside.component';
import { ThemeVerticalNavigationBasicItemComponent } from '@theme/components/navigation/vertical/components/basic/basic.component';
import { ThemeVerticalNavigationCollapsableItemComponent } from '@theme/components/navigation/vertical/components/collapsable/collapsable.component';
import { ThemeVerticalNavigationDividerItemComponent } from '@theme/components/navigation/vertical/components/divider/divider.component';
import { ThemeVerticalNavigationGroupItemComponent } from '@theme/components/navigation/vertical/components/group/group.component';
import { ThemeVerticalNavigationSpacerItemComponent } from '@theme/components/navigation/vertical/components/spacer/spacer.component';
import { ThemeVerticalNavigationComponent } from '@theme/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        ThemeHorizontalNavigationBasicItemComponent,
        ThemeHorizontalNavigationBranchItemComponent,
        ThemeHorizontalNavigationDividerItemComponent,
        ThemeHorizontalNavigationSpacerItemComponent,
        ThemeHorizontalNavigationComponent,
        ThemeVerticalNavigationAsideItemComponent,
        ThemeVerticalNavigationBasicItemComponent,
        ThemeVerticalNavigationCollapsableItemComponent,
        ThemeVerticalNavigationDividerItemComponent,
        ThemeVerticalNavigationGroupItemComponent,
        ThemeVerticalNavigationSpacerItemComponent,
        ThemeVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        ThemeScrollbarModule
    ],
    exports     : [
        ThemeHorizontalNavigationComponent,
        ThemeVerticalNavigationComponent
    ]
})
export class ThemeNavigationModule
{
}
