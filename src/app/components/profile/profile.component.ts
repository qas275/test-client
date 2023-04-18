import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private svc:GeneralService, protected dataSvc: DataService, public route:ActivatedRoute, private router: Router){

  }

  email="";
  numfavs = 0;

  ngOnInit(): void {
      this.email = this.dataSvc.svcUser.email;
      this.numfavs = this.dataSvc.svcUser.numFavs;
  }

  deleteUser(){
    let email = sessionStorage.getItem("email")!;
    this.svc.deleteUser(email);
    sessionStorage.removeItem('WS_JWT');
    alert('Account Deleted')
    this.router.navigate(['/login']);     
  }

  logout(){
    this.svc.logout();
    this.router.navigate(['/login']);
  }
}
