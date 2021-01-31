import { ProductAddComponent } from './@components/product-add/product-add.component';
import { UserCreateComponent } from './@components/user-create/user-create.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Order Management';

  constructor(
    public dialog: MatDialog
  ) { }

  createUser() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
