import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.less']
})
export class ShowProfileComponent implements OnInit {
  name:string = "Pablo";


  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    console.log("Submit");
  }

}
