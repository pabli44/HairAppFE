import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'hairAppFE';
  hideLogOut:boolean;


  ngOnInit(){
    if(localStorage.getItem("UserSession")){
      this.hideLogOut = false;
    }else{
      this.hideLogOut = true;
    }
  }

}
