import { NotificationService } from './@shared/service/notification.service';
import { CustomarService } from './@shared/service/customar.service';
import { InvoiceViewComponent } from './@components/invoice-view/invoice-view.component';
import { ProductAddComponent } from './@components/product-add/product-add.component';
import { UserCreateComponent } from './@components/user-create/user-create.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Order Management';
  allcustomar: any[] = [];

  constructor(
    public dialog: MatDialog,
    private customarService: CustomarService,
    private notificationService: NotificationService
  ) {
    this.getAllCustomar();
  }

  getAllCustomar() {
    this.customarService.filter().subscribe(
      (res: any) => {
        if (res.success) {
          this.allcustomar = res.data;
        } else {
          this.notificationService.showPopupDanger("User Getting error!!!")
        }
      }, err => {
        this.notificationService.showPopupDanger(err.message)
      }
    )
  }

  createUser() {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.customarService.create(result.data).subscribe(
          (res: any) => {
            if (res.success) {
              this.allcustomar.unshift(res.data)
            } else {
              this.notificationService.showPopupDanger(res.message)
            }
          }, err => {
            this.notificationService.showPopupDanger(err.message)
          }
        )
      }
    });
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  orderCreated() {
    Swal.fire({
      icon: 'success',
      title: 'Your Order Create Successfull',
      showConfirmButton: false,
      timer: 1000
    })
  }

  showOrderDetails() {
    const dialogRef = this.dialog.open(InvoiceViewComponent, {
      width: '890px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
