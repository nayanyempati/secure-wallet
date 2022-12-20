import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeVerticalNavigationComponent } from '@theme/components/navigation/vertical/vertical.component';
import { ThemeNavigationService } from '@theme/components/navigation/navigation.service';
import { ThemeNavigationItem } from '@theme/components/navigation/navigation.types';

@Component({
    selector       : 'theme-vertical-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeVerticalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: ThemeNavigationItem;
    @Input() name: string;

    private _themeVerticalNavigationComponent: ThemeVerticalNavigationComponent;
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
        this._themeVerticalNavigationComponent = this._themeNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._themeVerticalNavigationComponent.onRefreshed.pipe(
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
