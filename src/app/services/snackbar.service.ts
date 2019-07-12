import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})

/**
 * The Snackbar Service is responsible for delivering quick non-invasive communications to the end user.
 * @author Justin Kerr  (190422-USF)
 */
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Opens a "snackbar" message.
   * @param message - The message to the user.
   * @param action - Clicking this string typically closes the snackbar message. We've been using 'dismiss'.
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

}
