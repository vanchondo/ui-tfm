import { Component, OnInit } from '@angular/core';
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

  constructor(authService : AuthService) { 
    this.authService = authService;
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
        console.log(response.statusText + response.json);
      }
    
    })
    .catch(function(error) {
      console.error(error);
    });
  }

}
