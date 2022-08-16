import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { UserService } from '../services/user.service';
import { IRegister } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : IRegister;
  password2 : string;
  userService : UserService;
  appComponent: AppComponent;
  router: Router;

  constructor(userService: UserService, appComponent: AppComponent, router: Router) { 
    this.password2 = "";
    this.user = {
      username: "",
      password: "",
      email: ""
    }
    this.userService = userService;
    this.appComponent = appComponent;
    this.router = router;
  }

  ngOnInit(): void {

  }

  isFormValid() {
    return (this.user.email 
      && this.user.username
      && this.user.password
      && this.password2 === this.user.password)
  }

  register() {
    var _this = this;
    if (this.user.password === this.password2){
      this.userService.register(this.user).then(function (response){
        if (response.status === 201) {
          _this.appComponent.showSuccessMessage("Usuario creado correctamente");
          _this.router.navigate(['/']);
        }
        else if (response.status === 409) {
          _this.appComponent.showErrorMessage("Usuario/E-mail existente");
        }
        else {
          _this.appComponent.showErrorMessage("Datos invalidos");
        }
      })
    }
    else {
      _this.appComponent.showErrorMessage("Las contraseñas no coinciden");
    }
  }

}
