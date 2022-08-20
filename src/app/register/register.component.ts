import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { Constants } from '../app.constants';
import { UserService } from '../services/user.service';
import { IRegister } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : IRegister = {
    username: "",
    password: "",
    email: ""
  };
  password2 : string = "";
  emailClass: string ="";
  usernameClass: string ="";
  passwordClass: string ="";

  constructor(private userService: UserService, private appComponent: AppComponent, private router: Router) {  }

  ngOnInit(): void {

  }

  isFormValid() {
    return this.validateEmail(this.user.email) 
      && this.validateUsername(this.user.username)
      && this.password2 === this.user.password
      && this.validatePassword(this.user.password);
  }

  register() {
    var _this = this;
    if (this.user.password === this.password2){
      this.userService.register(this.user).subscribe({
        next: () => {
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

  checkEmailAvailability() {
    if (this.validateEmail(this.user.email)){
      this.userService.checkEmailAvailability(this.user.email).subscribe({
        next: () => this.emailClass = Constants.FIELD_VALID_CLASS,
        error: () => this.emailClass = Constants.FIELD_INVALID_CLASS 
      });
    }
  }

  checkUsernameAvailability() {
    if (this.validateUsername(this.user.username)){
      this.userService.checkUsernameAvailability(this.user.username).subscribe({
        next: () => this.usernameClass = Constants.FIELD_VALID_CLASS,
        error: () => this.usernameClass = Constants.FIELD_INVALID_CLASS 
      });
    }
  }

  checkPassword() {
    if (this.password2 === this.user.password && this.validatePassword(this.user.password)){
      this.passwordClass = Constants.FIELD_VALID_CLASS;
    }
    else {
      this.passwordClass = Constants.FIELD_INVALID_CLASS;
    }
  }

  validateEmail(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validateUsername(username: string){
    return username.length > 5 && username.length < 26;
  }

  validatePassword(password: string){
    return password.length > 5 && password.length < 51;
  }

}
