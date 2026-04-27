import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
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
