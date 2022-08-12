import { Component, OnInit } from '@angular/core';
import { IRegister } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : IRegister;
  password2 : string;
  constructor() { 
    this.password2 = "";
    this.user = {
      username: "",
      password: "",
      email: ""
    }    
  }

  ngOnInit(): void {

  }

  register() {

  }

}
