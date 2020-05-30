import { MAT_DIALOG_DATA, MatDialogRef ,MatDialogModule, MatDialog} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-details.dialog',
  templateUrl: './details.dialog.component.html',
  styleUrls: ['./details.dialog.component.css']
})
export class DetailDialogComponent {

  constructor(public dialogRef: MatDialogRef<DetailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

