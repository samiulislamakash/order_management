import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showPopupSuccess(text: string) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: "snackbar-success"
    });
  }

  showPopupDanger(text: string) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: "snackbar-danger"
    });
  }

  showPopupInfo(text: string) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: "snackbar-info"
    });
  }

  showPopupWarning(text: string) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: "top",
      horizontalPosition: "right",
      panelClass: "snackbar-warning"
    });
  }
}
