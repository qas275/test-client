import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientNg';

  @ViewChild(ProfileComponent)
  profileComponent!: ProfileComponent;

  constructor(private router:Router){
    
  }
  
  navProfile(){
    this.router.navigate(['/profile'])
  }

  
}
