import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {BackendapiService} from '../../services/backendapi.service';
import {Router} from '@angular/router';
import {User} from '../../model/User';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  user: User = {
    userEmail: ''
  };

  showSucessMessage: string;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendapiService, private route: Router) {
  }

  ngOnInit() {
    this.apiServices.logout();
    this.route.navigateByUrl('users/forget-password');
  }


  userForgetPassword(f) {

    this.apiServices.userForgetPassword(this.user).subscribe((response: any) => {
      this.showSucessMessage = 'Reset Link Sent your Registered Email Successfully';
      this.resetForm(f);
    }, error => {
      this.serverErrorMessages = error.error.response;
      setTimeout(() => this.serverErrorMessages = false, 4000);
    });
  }


  resetForm(form: NgForm) {
    this.user = {
      userEmail: '',

    };
    form.resetForm();
  }

}
