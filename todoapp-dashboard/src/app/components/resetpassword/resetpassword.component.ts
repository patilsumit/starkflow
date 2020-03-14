import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {BackendapiService} from '../../services/backendapi.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {


  user: User = {
    userPassword: '',
  };

  postData = {};
  token;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendapiService, private route: Router, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.token = this.router.snapshot.queryParams.token;
  }


  userResetPassword() {
    this.postData = {
      userPassword: this.user.userPassword,
      token: this.token
    };
    this.apiServices.userResetPassword(this.postData).subscribe((response) => {
      this.route.navigateByUrl('/users/signin');
    }, error => {
      this.serverErrorMessages = error.error.response;
      setTimeout(() => this.serverErrorMessages = false, 4000);
    });
  }

}
