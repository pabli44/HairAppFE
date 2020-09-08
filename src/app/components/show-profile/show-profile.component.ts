import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.less']
})
export class ShowProfileComponent implements OnInit {
  name:string = "Pablo";


  constructor() { }

  ngOnInit() {
  }

}
