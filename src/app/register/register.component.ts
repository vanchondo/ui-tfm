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
      this.userService.register(this.user).subscribe({
        next: (res) => {
          _this.appComponent.showSuccessMessage("Usuario creado correctamente");
          _this.router.navigate(['/login']);
        },
        error: (err) => {
          let errorMessage = "Datos invalidos";
          if (err.error.messages){
            errorMessage = err.error.messages.toString();
          }
          _this.appComponent.showErrorMessage(errorMessage);
        }
      })
    }
    else {
      _this.appComponent.showErrorMessage("Las contraseñas no coinciden");
    }
  }

}
