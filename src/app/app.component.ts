import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./w3.css','./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  showSB(){
    document.getElementById("sidebar").style.display = "block"
  }

  closeSB(){
    document.getElementById("sidebar").style.display = "none"
  }
}
