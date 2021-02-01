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
  constructor(
    public dialogRef: MatDialogRef<ProductAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: [, [Validators.required]],
      price: [, [Validators.required]],
      quantity: [, [Validators.required]],
      total: [, [Validators.required]]
    })

    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close({ success: false }));
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  save() {
    this.dialogRef.close({ success: true, data: this.form.value });
  }

  updateTotal() {

  }

  updateData() {

  }

}
