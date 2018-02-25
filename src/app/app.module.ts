import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TagfinderComponent } from './tagfinder/tagfinder.component';
import { DataService } from './data.service';
import { AppRoutingModule } from './/app-routing.module';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TagfinderComponent,
    LoginCallbackComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
