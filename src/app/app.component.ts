import { Component } from '@angular/core';
import { ICurrentUser } from './login/current-user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui-tfm';
  ALERT_DANGER : string = "alert-danger";
  ALERT_SUCCESS : string = "alert-success";
  message : string = "";
  messageClass : string = "";
  currentUser : ICurrentUser = {
    iss: '',
    email: '',
    username: '',
    role: '',
    exp: '',
    iat: ''
  };

  constructor(private authService : AuthService){ }


  showSuccessMessage(message : string) {
    this.messageClass = this.ALERT_SUCCESS;
    this.message = message;
  }

  showErrorMessage(message : string) {
    this.messageClass = this.ALERT_DANGER;
    this.message = message;
  }

  setCurrentUser(){
    var _this = this;
    this.authService.currentUser().subscribe({
      next: (response) => _this.currentUser = response});
  }
}
