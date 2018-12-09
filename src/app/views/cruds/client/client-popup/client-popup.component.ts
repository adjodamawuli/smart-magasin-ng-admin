import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-popup',
  templateUrl: './client-popup.component.html',
  styleUrls: ['./client-popup.component.scss']
})
export class ClientPopupComponent implements OnInit {

  public itemForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientPopupComponent>,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload)
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      nom: [item.nom || '', Validators.required],
      prenom: [item.prenom || ''],
      tel: [item.tel || ''],
      createdAt: [item.createdAt || ''],
      updatedAt: [item.updatedAt || '']
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }
}
