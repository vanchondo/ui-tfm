import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../services/auth.service';
import { ILogin } from './login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: ILogin;
  authService : AuthService;
  appComponent : AppComponent;
  router: Router;

  constructor(authService : AuthService, appComponent : AppComponent, router: Router) { 
    this.authService = authService;
    this.appComponent = appComponent;
    this.router = router;
    this.user = {
      username: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  login() {
    var _this = this;
    this.authService.login(this.user).then(function (response) {
      if (!response.error) {
        _this.authService.setSession(response.token);
        _this.appComponent.setCurrentUser();
        _this.router.navigate(['/']);
      }
      else {
        _this.appComponent.showErrorMessage("Usuario y/o constraseña incorrectos");
        _this.authService.removeSession();
      }
    
    })
    .catch(function(error) {
      console.error(error);
    });
  }

}
