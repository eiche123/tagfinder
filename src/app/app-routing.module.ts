import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginCallbackComponent} from './login-callback/login-callback.component';
import {TagfinderComponent} from './tagfinder/tagfinder.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: TagfinderComponent},
  { path: 'callback', component: LoginCallbackComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
