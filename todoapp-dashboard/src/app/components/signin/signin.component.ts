import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {BackendapiService} from '../../services/backendapi.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {
    userEmail: '',
    userPassword: '',
  };
  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendapiService, private route: Router) {
  }

  ngOnInit() {
  }

  userLogin() {
    this.apiServices.userLogin(this.user).subscribe(
      (res: any) => {
        this.showSucessMessage = true;
        this.apiServices.saveToken(res.data.token);
        this.apiServices.saveUserName(res.data.userName);
        this.route.navigateByUrl('/users/home');
      },
      err => {
        this.serverErrorMessages = err.error.error;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      }
    );
  }

}
