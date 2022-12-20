import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        private _matSnackBar: MatSnackBar,) {
    }
    /**
   * errorHandler
   */
    errorHandler(message: string, error: string) {
        this._matSnackBar.open(message, 'End now', {
            duration: 2000,
            panelClass: error,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }

}