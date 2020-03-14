import {Component, OnInit} from '@angular/core';
import {BackendapiService} from '../../services/backendapi.service';
import {Todo} from '../../model/Todo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  pageOfItems = [];
  pageNo = 0;
  todos: any;
  showSucessMessage: boolean;
  serverErrorMessages: boolean;

  constructor(private apiServices: BackendapiService) {
  }


  ngOnInit() {

    this.getAllTodo();

  }


  getAllTodo() {
    this.apiServices.getAllTodo(this.pageNo).subscribe((response: any) => {
      this.todos = response.data.data;
      const countPage = response.data.totalCount / this.apiServices.pageLimit;
      for (let i = 0; i < countPage; i++) {

        this.pageOfItems[i] = 0;
      }
    }, error => {
      throw  error;
    });
  }

  clickPage(data) {
    this.pageNo = data;

    this.getAllTodo();
  }


  deleteTodo(id) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.apiServices.deleteTodo(id).subscribe((response: any) => {
        this.getAllTodo();
        this.showSucessMessage = response.message;
        setTimeout(() => this.showSucessMessage = false, 4000);
      }, error => {
        this.serverErrorMessages = error.error.error;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    }
  }


}
