import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TIHLocation } from 'src/app/models';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private authSvc: AuthService, public sanitizer:DomSanitizer, private activatedRoute:ActivatedRoute,private dataSvc:DataService, private svc:GeneralService, private router:Router, private fb:FormBuilder){
    
  }

  @ViewChild('picture') picture!:ElementRef

  selectedlocation!:TIHLocation
  commentForm!:FormGroup
  hideForm=1;
  gmap = ""
  
  ngOnInit(): void {
    if(!this.authSvc.jwtCheck()){
      this.router.navigate(['/login'])
    }else{
      this.selectedlocation = this.dataSvc.selectedLocation;
      this.selectedlocation.fav = false;
      this.dataSvc.svcUser.favorites.forEach(loc =>{
        if(loc.uuid === this.selectedlocation.uuid){
          this.selectedlocation.fav =true;
        }
      })
      this.hideForm = 1;
      this.commentForm = this.createForm();
      this.svc.getComments(this.selectedlocation.uuid).then(v=> {this.selectedlocation.locationComments= v; console.log(v)});
      let name = this.selectedlocation.name.replace(" ","+")
      this.gmap="https://www.google.com/maps/embed/v1/place?key=AIzaSyCBsiF-fnqF2OddWShJ_wCYlB4OTK5NTuo&q="+name+"&center="+this.selectedlocation.location.latitude+","+this.selectedlocation.location.longitude;
      console.log(this.gmap)
      console.log("FAV?", this.selectedlocation.fav);
    }
  }

  addFav(){
    console.log("SAVING")
    this.dataSvc.svcUser.favorites.push(this.selectedlocation);
    this.svc.saveFavourite().then(
      v=>console.log(v)
    );
    alert("Location Saved!");
    this.router.navigate(['/home'])
  }
  
  removeFav(){
    const idxRemove = this.dataSvc.svcUser.favorites.findIndex(v => v.uuid===this.selectedlocation.uuid);
    console.log(idxRemove)
    this.dataSvc.svcUser.favorites.splice(idxRemove,1);
    this.svc.saveFavourite().then(
      v=>console.log("saving" +v)
      );
    alert('Removed from Favorites');
    this.router.navigate(['/home'])
  }

  createForm(){
    return this.fb.group({
      rating:this.fb.control(1, Validators.required),
      comment:this.fb.control('',Validators.required),
      picture:this.fb.control('', Validators.required) //check if required here works to disable button
    })
  }

  addComment(){
    //TODO
    const file = this.picture.nativeElement.files[0]
    this.svc.addComment(file, this.selectedlocation.uuid, 
      this.commentForm.controls['rating'].value, 
      this.commentForm.controls['comment'].value);
    console.log("UPLOADED")
    alert("COMMENTED")
    this.commentForm = this.createForm();
    this.svc.getComments(this.selectedlocation.uuid).then(v=> {this.selectedlocation.locationComments= v});
  }

  emailCheck(idx:number):boolean{
    console.log("EMAIL CHECK" + this.selectedlocation.locationComments[idx])
    return this.selectedlocation.locationComments[idx].email===sessionStorage.getItem("email")
  }

  deleteComment(post_id:string){
    this.svc.deleteComment(post_id).then(v=>{
      alert("removed comment!")
      this.ngOnInit(); //attempting to reload page instead of redirect to home
    });
    // this.router.navigate(['/home'])
  }

  toggleForm(){
    this.hideForm=this.hideForm*(-1);
    console.log(this.hideForm)
  }

  logout(){
    this.svc.logout();
    this.router.navigate(['/login']);
  }


}
