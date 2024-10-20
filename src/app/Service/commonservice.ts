import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class commonservice {
  createMode: boolean=false;
  submitButtonLabel: string='';
  editedContact: any;

  constructor() {}

  setValues(createMode: boolean, submitButtonLabel: string, editedContact: any) {
    this.createMode = createMode;
    this.submitButtonLabel = submitButtonLabel;
    this.editedContact = editedContact;
  }
}