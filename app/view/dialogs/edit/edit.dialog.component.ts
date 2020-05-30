import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {DataService} from '../../../service/data.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css'],
   encapsulation: ViewEncapsulation.None 
})
export class EditDialogComponent implements OnInit {
 
 roleid:any;
 namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
 numberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
 emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.]+[a-z]{2,4}$" ;
  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
            
               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  stopEdit(): void {
    this.dataService.updateIssue(this.data);
   this.dataService.updateItem(this.data);
    
  }
  ngOnInit() {
    this.roleid=sessionStorage.getItem('roleid');
  }
}
