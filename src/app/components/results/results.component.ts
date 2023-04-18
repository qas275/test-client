import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TIHLocation, TIHResponse } from 'src/app/models';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit{

  constructor(private authSvc:AuthService, protected dataSvc:DataService ,private svc:GeneralService, private router:Router){
    
  }
  
  keyword = ""
  tihResp?:TIHResponse;
  
  ngOnInit(): void {
    if(!this.authSvc.jwtCheck()){
      this.router.navigate(['/login']);
    }else{
      this.keyword = this.dataSvc.keyword
      this.tihResp = this.dataSvc.response;
      console.log(this.dataSvc.searchResults)
    }
    // this.dataSvc.searchResults = this.tihResp?.data;
    // this.dataSvc.searchResults.forEach(v=>{
    //   let arr = this.dataSvc.svcUser.favorites.filter(e=>{console.log(e);console.log(e.uuid===v.uuid)});
    //   console.log(arr, "arr")
      // if(this.dataSvc.svcUser.favorites.filter(e=>{console.log(e);e.uuid===v.uuid}).length>1){
      //   v.fav=true;
      //   console.log("fav found", v.name)
      // }else{
      //   console.log(this.dataSvc.svcUser.favorites.filter(e=>{e.uuid===v.uuid; console.log(e.name, e.uuid, v.name, v.uuid)}))
      //   console.log(this.dataSvc.svcUser.favorites.filter(e=>{e.uuid===v.uuid}).length)
      //   v.fav = false;
      // }
    // });
    
    // console.log(this.dataSvc.searchResults.forEach(v=>console.log(v.name, v.fav)))
  }

  nav(idx:number){
    this.dataSvc.selectedLocation = this.dataSvc.searchResults[idx];
    this.router.navigate(['/details']);
  }

  logout(){
    this.svc.logout();
    this.router.navigate(['/login']);
  }
}
