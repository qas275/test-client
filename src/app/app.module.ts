import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { ResultsComponent } from './components/results/results.component';
import { DetailsComponent } from './components/details/details.component';
import { CommentComponent } from './components/comment/comment.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SafePipe } from './pipe/safe.pipe';
import { InterceptorService } from './service/interceptor.service';

const appRoutes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"", component:LoginComponent},
  {path:"search", component:SearchComponent},
  {path:"results", component:ResultsComponent},
  {path:"details", component:DetailsComponent},
  {path:"comment", component:CommentComponent},
  {path:"home", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent},
  {path:"**", redirectTo:'/', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    ResultsComponent,
    DetailsComponent,
    CommentComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    SafePipe
    
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    GoogleMapsModule,RouterModule.forRoot(appRoutes, {useHash:true}), 
    MaterialModule
  ],
  providers: [SafePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function(router: Router) {
        return new InterceptorService(router);
      },
      multi: true,
      deps: [Router]
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
