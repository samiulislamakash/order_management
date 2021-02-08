import { NotificationService } from './../../@shared/service/notification.service';
import { ProductService } from './../../@shared/service/product.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  form: FormGroup;
  allproduct: any[] = [];
  product: any;
  constructor(
    public dialogRef: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: [, [Validators.required]],
      quantity: [0, [Validators.required]],
      total: [, [Validators.required]]
    })

    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close({ success: false }));
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.filter().subscribe(
      (res: any) => {
        if (res.success) {
          this.allproduct = res.data;
        } else {
          this.notificationService.showPopupDanger(res.message)
        }
      }, err => {
        this.notificationService.showPopupDanger(err.message)
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  save() {
    const data = {
      productId: this.product._id,
      productName: this.product.name,
      price: this.product.price,
      quantity: this.form.get('quantity')?.value,
      total: this.form.get('total')?.value
    }
    this.dialogRef.close({ success: true, data });
  }

  updateTotal() {
    this.form.controls['total'].patchValue(this.product.price * this.form.get('quantity')?.value)
  }

  updateData(e: any) {
    this.product = this.allproduct[e]
    this.form.controls['price'].patchValue(this.allproduct[e].price)
    this.form.controls['quantity'].patchValue(1);
    this.form.controls['total'].patchValue(this.allproduct[e].price * this.form.get('quantity')?.value)
  }

}
