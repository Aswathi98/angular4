import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../../service/data.service';
import {FormControl, Validators} from '@angular/forms';
import {Issue} from '../../models/issue';
import { SendMailService } from '../../../service/send-mail.service';
@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent {
    batchName: any[] = [];
    ngOnInit() {
 
    this.sendmail.getBatchName()
      .subscribe(
      (res) => {

        this.batchName = res;
        console.log(this.batchName);

      })

  }
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Issue,
              public dataService: DataService,public sendmail: SendMailService) { }
  // options:any = [];
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
  // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.dataService.addIssue(this.data);

  }


   
    
  
}

