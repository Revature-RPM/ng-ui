import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})

/**
 * The Snackbar Service is responsible for delivering quick
 * non-invasive communications to the end user. Examples
 * of this are failed login attempts, invalid form fields, etc.
 *
 * @author Justin Kerr
 */

export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
