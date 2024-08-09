import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { LoginComponent } from './components/login/login.component';
import { SignupStep1Component } from './components/signup-step1/signup-step1.component';
import { SignupStep2Component } from './components/signup-step2/signup-step2.component';
import { SuccessComponent } from './components/success/success.component';

export const routes: Routes = [
  { path: '', component: EntryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup-step1', component: SignupStep1Component },
  { path: 'signup-step2', component: SignupStep2Component },
  { path: 'success', component: SuccessComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
