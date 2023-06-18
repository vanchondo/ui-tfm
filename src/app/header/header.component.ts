import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { Constants } from '../app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  LOGIN_PAGE : string = Constants.SSO_URL + "?origin=" + window.location.href.split('?')[0];

  constructor(public appComponent : AppComponent, private router : Router) { }

  ngOnInit(): void {    
    this.appComponent.setCurrentUser(); 
  }

  signOut(): void {
    this.appComponent.removeSession();
  
    this.appComponent.showSuccessMessage("Sesión cerrada")
    window.location.href = this.LOGIN_PAGE;
  }
}
