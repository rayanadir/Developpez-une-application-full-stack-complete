import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { AccountComponent } from './pages/account/account.component';
import { CreateComponent } from './pages/create/create.component';
import { PostComponent } from './pages/post/post.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "welcome",
    pathMatch: "full",
  },
  {
    title: "Welcome",
    path: "welcome",
    component: WelcomeComponent,
    canActivate: [UnauthGuard],
  },
  { 
    title: "Login",
    path: "login",
    component: LoginComponent,
    canActivate: [UnauthGuard],
  },
  { 
    title: "Register",
    path: "register",
    component: RegisterComponent,
    canActivate: [UnauthGuard], 
  },
  { 
    title: "Posts",
    path: "posts",
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  { 
    title: "Topics",
    path: "topics",
    component: TopicsComponent,
    canActivate: [AuthGuard],
  },
  {
    title: "Account",
    path: "account",
    component: AccountComponent,
    canActivate: [AuthGuard],
  },
  {
    title:"Create Post",
    path: "create",
    component: CreateComponent,
    canActivate: [AuthGuard],
  },
  {
    title:"Post",
    path:"post/:id",
    component: PostComponent,
    canActivate: [AuthGuard],
  },
  {
    title: "Not found",
    path:"404",
    component: NotFoundComponent,
  },
  {
    title:"Not found",
    path:"**",
    redirectTo:"404"
  }
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
