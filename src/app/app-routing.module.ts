import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TagfinderComponent} from './tagfinder/tagfinder.component';


const routes: Routes = [
  { path: '', component: TagfinderComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
