import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackendapiService {


  static apiBaseUrl = 'http://localhost:3000/api';

  private token: string;

  public userName: string;

  public pageLimit = 10;


  constructor(private http: HttpClient, private route: Router) {

  }

  saveToken(token: string) {
    localStorage.setItem('usertoken', token);
    this.token = token;
  }

  saveUserName(userName) {
    localStorage.setItem('userName', userName);
    this.userName = userName;
  }

  getUserName() {
    if (!this.userName) {
      this.userName = localStorage.getItem('userName');
    }

    return this.userName;

  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken');
    }
    return this.token;
  }


  isLoggedIn() {
    const token = this.getToken();
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  public logout() {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    window.localStorage.removeItem('userName');
    this.route.navigateByUrl('/');
  }


  addNewUser(postData) {
    return this.http.post(BackendapiService.apiBaseUrl + `/users`, postData);
  }

  userLogin(postData) {
    return this.http.post(BackendapiService.apiBaseUrl + `/users/login`, postData);
  }

  userProfile() {
    return this.http.get(BackendapiService.apiBaseUrl + `/users/profile`, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }

  userForgetPassword(postData) {
    return this.http.post(BackendapiService.apiBaseUrl + `/users/forget-password`, postData);

  }

  userResetPassword(postData) {
    return this.http.post(BackendapiService.apiBaseUrl + `/users/reset-password`, postData);
  }


  createNewTodo(postData) {
    return this.http.post(BackendapiService.apiBaseUrl + `/todos`, postData, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }

  getAllTodo(pageNo) {
    const page = this.pageLimit * pageNo;
    return this.http.get(BackendapiService.apiBaseUrl + `/todos?skip=${page}&limit=${this.pageLimit}`, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }


  getTodoById(id) {
    return this.http.get(BackendapiService.apiBaseUrl + `/todos/` + id, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }

  updateTodo(id, postData) {
    return this.http.put(BackendapiService.apiBaseUrl + `/todos/` + id, postData, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }

  deleteTodo(id) {
    return this.http.delete(BackendapiService.apiBaseUrl + `/todos/` + id, {
      headers: {Authorization: ` ${this.getToken()}`}
    });
  }

}
