import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less']
})
export class ClientComponent implements OnInit {
  name:string = "";

  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem("UserSession")){
      this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.name = params['name'];
        });
    }else{
      this.router.navigate(['/login']);
    }


  }

}
