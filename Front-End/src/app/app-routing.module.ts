import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminaddservicesComponent } from './adminaddservices/adminaddservices.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
//import { HomelocationComponent } from './homelocation/homelocation.component';
import { LoginComponent } from './login/login.component';
import { MainservicesComponent } from './mainservices/mainservices.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterProfComponent } from './register-prof/register-prof.component';
import { SignupComponent } from './signup/signup.component';
import { StepComponent } from './step/step.component';
import { SuccessComponent } from './success/success.component';
import { UpdateComponent } from './update/update.component';
import { ServicesdescriptionComponent } from './servicesdescription/servicesdescription.component'

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'step/:User',component:StepComponent},
  {path:'mainservices',component:MainservicesComponent},
  {path:'registerProf',component:RegisterProfComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'mybookings',component:MybookingsComponent},
  {path:'success',component:SuccessComponent},
  {path:'adminaddservices',component:AdminaddservicesComponent},
  {path:'update/:serviceId',component:UpdateComponent},
  {path:'servicesdescription',component:ServicesdescriptionComponent},
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path:"**",component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
