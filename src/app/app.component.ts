import { Component } from '@angular/core';
import { ICurrentUser } from './login/current-user';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { skip, take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ui-tfm';
  ALERT_DANGER: string = "alert-danger";
  ALERT_SUCCESS: string = "alert-success";
  message: string = "";
  messageClass: string = "";
  currentUser: ICurrentUser = {
    iss: '',
    email: '',
    username: '',
    role: '',
    exp: '',
    iat: ''
  };

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }


  showSuccessMessage(message: string) {
    this.messageClass = this.ALERT_SUCCESS;
    this.message = message;
  }

  showErrorMessage(message: string) {
    this.messageClass = this.ALERT_DANGER;
    this.message = message;
  }

  hideMessage() {
    this.messageClass = "";
    this.message = "";
  }

  removeSession() {
    this.authService.removeSession();
    this.currentUser = {
      iss: '',
      email: '',
      username: '',
      role: '',
      exp: '',
      iat: ''
    };
  }

  setCurrentUser() {
    var _this = this;
    var skipCnt = localStorage.getItem('id_token') ? 0 : 1;

    this.route.queryParamMap
      .pipe(skip(skipCnt))
      .subscribe(p => {
        var token = p.get('token');
        if (token) {
          localStorage.setItem('id_token', token);
          this.router.navigate([], {
            queryParams: {
              'token': null
            },
            queryParamsHandling: 'merge'
          })
        }
        this.authService.currentUser().subscribe({
          next: (response) => _this.currentUser = response
        });
      });
  }
}
