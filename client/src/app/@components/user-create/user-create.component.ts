import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {

  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close({ success: false }));

  }

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  save() {
    this.dialogRef.close({ success: true, data: this.userForm.value })
  }

}
