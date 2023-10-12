import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes : Routes = [
  {path:"", redirectTo:"welcome", pathMatch:"full"},
  {title: "Welcome", path: "welcome", component: WelcomeComponent},
  {title: "Login", path:"login", component: LoginComponent},
  {title: "Register", path:"register", component: RegisterComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
