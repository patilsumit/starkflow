import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from '../../model/Todo';
import {BackendapiService} from '../../services/backendapi.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  constructor(private apiServices: BackendapiService, public route: ActivatedRoute, private router: Router) {
  }

  todos: any[];
  todo: Todo = {
    todoTitle: '',
    todoDescription: '',
    todoStatus: ''
  };

  todoPageName = 'Todo';
  showSucessMessage: boolean;
  serverErrorMessages: boolean;


  id = this.route.snapshot.params.id;

  ngOnInit() {

    this.getTodoById(this.id);
  }


  getTodoById(id) {
    if (id) {
      this.apiServices.getTodoById(id).subscribe((response: any) => {
        this.todo = response.data;
      }, error => {
        throw  error;
      });
    } else {
      return false;
    }

  }


  addTodo(todoData: NgForm) {

    if (!this.id) {
      this.apiServices.createNewTodo(this.todo).subscribe((response: any) => {
        this.showSucessMessage = response.message;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(todoData);
      }, error => {
        this.serverErrorMessages = error.error.error;
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    } else {

      this.apiServices.updateTodo(this.id, this.todo).subscribe((response: any) => {
        this.todos = response.data;
        this.showSucessMessage = response.message;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(todoData);
        this.router.navigate(['/users/home']);
      }, error => {
        this.serverErrorMessages = error.error.error
        setTimeout(() => this.serverErrorMessages = false, 4000);
      });
    }
  }


  resetForm(form: NgForm) {
    this.todo = {
      todoTitle: '',
      todoDescription: '',
      todoStatus: ''
    };
    form.resetForm();
  }


}
