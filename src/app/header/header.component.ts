import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appComponent : AppComponent;

  constructor(appComponent : AppComponent) { 
    this.appComponent = appComponent;
  }


  ngOnInit(): void {
    this.appComponent.setCurrentUser();
  }
}
