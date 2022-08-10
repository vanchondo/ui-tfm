import { Component } from '@angular/core';

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


  showSuccessMessage(message : string) {
    this.messageClass = this.ALERT_SUCCESS;
    this.message = message;
  }

  showErrorMessage(message : string) {
    this.messageClass = this.ALERT_DANGER;
    this.message = message;
  }
}
