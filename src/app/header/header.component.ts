import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public appComponent : AppComponent, private router : Router) { }

  ngOnInit(): void {
    this.appComponent.setCurrentUser();
  }

  signOut(): void {
    this.appComponent.removeSession();
  
    this.appComponent.showSuccessMessage("Sesión cerrada")
    this.router.navigate(['/login']);
  }
}
