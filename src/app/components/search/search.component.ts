import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  constructor(private authSvc:AuthService ,private svc:GeneralService, private dataSvc: DataService, private fb:FormBuilder, private router: Router){
    
  }

  searchForm!:FormGroup

  ngOnInit(): void {
    if(!this.authSvc.jwtCheck()){
      this.router.navigate(['/login']);
    }else{
      this.searchForm = this.createSearchForm();
    }
  }

  createSearchForm(){
    return this.fb.group({
      keyword: this.fb.control('', Validators.required)
    })
  }

  async search(){
    this.dataSvc.keyword = this.searchForm.controls['keyword'].value
    // this.dataSvc.response = await this.svc.search(this.dataSvc.keyword)
    await this.svc.search(this.dataSvc.keyword)
    this.router.navigate(['/results'])
  }

  logout(){
    this.svc.logout();
    this.router.navigate(['/login']);
  }
}
