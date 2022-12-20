import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeHorizontalNavigationComponent } from '@theme/components/navigation/horizontal/horizontal.component';
import { ThemeNavigationService } from '@theme/components/navigation/navigation.service';
import { ThemeNavigationItem } from '@theme/components/navigation/navigation.types';

@Component({
    selector       : 'theme-horizontal-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeHorizontalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: ThemeNavigationItem;
    @Input() name: string;

    private _themeHorizontalNavigationComponent: ThemeHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _themeNavigationService: ThemeNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._themeHorizontalNavigationComponent = this._themeNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._themeHorizontalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
