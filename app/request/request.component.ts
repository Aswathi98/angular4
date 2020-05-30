import { Component, OnInit } from '@angular/core';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requests=[
    {"id":1, "name": "My Records"}
  ]
  constructor(private router: Router) {}

  ngOnInit() {
  }
  onSelect(request){
  this.router.navigate(['/requests', request.id]);
  }

}
