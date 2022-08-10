import { Component, OnInit } from '@angular/core';
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

  constructor(authService : AuthService, appComponent : AppComponent) { 
    this.authService = authService;
    this.appComponent = appComponent;
    this.user = {
      username: "",
      password: ""
    }
  }

  ngOnInit(): void {
  }

  login() {
    var _this = this;
    console.log(this.user.username);
    console.log(this.user.password);
    this.authService.login(this.user).then(function (response) {
      if (response.status === 200) {
        _this.authService.setSession(response.body + "");
      }
      else {
        _this.appComponent.showErrorMessage("Usuario y/o constraseña incorrectos");
      }
    
    })
    .catch(function(error) {
      console.error(error);
    });
  }

}
