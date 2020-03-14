import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {User} from '../../model/User';
import {BackendapiService} from '../../services/backendapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  users: any[];
  user: User = {
    userName: '',
    userEmail: '',
    userPassword: '',
    confirmPassword: ''
  };

  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendapiService, private route: Router) {
  }

  @ViewChild('todoForm', null) form: any;

  ngOnInit() {
  }


  createNewUser(f) {
    const {userName, userEmail, userPassword} = this.user;

    const userData = {userName, userEmail, userPassword};

    this.apiServices.addNewUser(userData).subscribe((response: any) => {
      this.showSucessMessage = response.message;
      setTimeout(() => this.showSucessMessage = false, 4000);
      this.resetForm(f);
    }, err => {
      console.log(err)
      this.serverErrorMessages = err.error.error;
      setTimeout(() => this.serverErrorMessages = false, 4000);
    });
  }


  resetForm(form: NgForm) {
    this.user = {
      userName: '',
      userEmail: '',
      userPassword: ''
    };
    form.resetForm();
  }


}
