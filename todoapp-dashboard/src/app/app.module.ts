import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {TodoComponent} from './components/todo/todo.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {ForgetpasswordComponent} from './components/forgetpassword/forgetpassword.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {HomeComponent} from './components/home/home.component';
import {NavigationComponent} from './layout/navigation/navigation.component';

import {AuthguardService} from './services/authguard.service';

import {BackendapiService} from './services/backendapi.service';


import {MustMatchDirective} from './_helpers/must-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    SigninComponent,
    SignupComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    HomeComponent,
    NavigationComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [BackendapiService, AuthguardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
