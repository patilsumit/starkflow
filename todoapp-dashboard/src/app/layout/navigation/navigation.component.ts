import { Component, OnInit } from '@angular/core';
import {BackendapiService} from '../../services/backendapi.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userName: any;

  constructor(public apiServices: BackendapiService) {
    this.userName = this.apiServices.getUserName();
  }
  ngOnInit() {
  }

}
