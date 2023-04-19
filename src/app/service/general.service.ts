import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs'
import { LocationComment, TIHLocation, TIHResponse, userAllDetails } from '../models';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

constructor( private http:HttpClient, private dataSvc:DataService) { }

  async loadFavourties(email:string){
    let params = new HttpParams().set('email', email);
    const jsonS:userAllDetails = await lastValueFrom<userAllDetails>(this.http.get<userAllDetails>('/load', { params: params,headers:this.setHead()}));
    this.dataSvc.svcUser.email = jsonS.email;
    this.dataSvc.svcUser.numFavs = jsonS.numFavs;
    if (this.dataSvc.svcUser.numFavs > 0) {
      this.dataSvc.svcUser.favorites = jsonS.favorites;  
    }
    return this.dataSvc.svcUser;

  }

  async search(keyword:string){
    let params = new HttpParams().set('keyword', keyword);
    console.log("INIT SEARCH " +keyword)
    await lastValueFrom(this.http.get<TIHResponse>('/search', {params:params,headers:this.setHead()})).then(v=>{
      this.dataSvc.searchResults = v.data
    })
  }

  async saveFavourite(){
    this.dataSvc.svcUser.numFavs = this.dataSvc.svcUser.favorites.length;
    console.log("BEFORE SAVING WHAT IS USER??? >>> "+this.dataSvc.svcUser.email);
    let response = await lastValueFrom(this.http.post('/updateFav',this.dataSvc.svcUser, {headers:this.setHead()})).then(
      (res) =>{
        console.log("SAVED "+res)
        return res;
      })
  }

  addComment(image: Blob, location_id:string, rating: number, comment:string):Promise<any>{
    const formData = new FormData();
    formData.set("email", this.dataSvc.svcUser.email)
    formData.set("location_id", location_id)
    formData.set("rating", rating.toString())
    formData.set("image", image)
    formData.set("comment", comment)
    return firstValueFrom(
      this.http.post<any>('/comment', formData, {headers:this.setHead()})
    )
  }

  getComments(UUID:String):Promise<LocationComment[]>{
    return lastValueFrom(
      this.http.get<LocationComment[]>('/getComments/'+UUID, {headers:this.setHead()})
    )
  }

  deleteComment(idx:string){
    return lastValueFrom(
      this.http.delete('/deleteComment/'+idx, {headers:this.setHead()})
      )
    }
    
  deleteUser(email:string){
    let params = new HttpParams().set('email', email);
    return lastValueFrom(this.http.delete('/deleteUser', {params:params,headers:this.setHead()}))
  }

  setHead():HttpHeaders{
    let head = 'Bearer'+sessionStorage.getItem('WS_JWT');
    return new HttpHeaders().set("Authorisation", head).append("Access-Control-Allow-Origin","*");
  }

  logout(){
    sessionStorage.removeItem('WS_JWT');
    this.dataSvc.svcUser = {email:"" ,numFavs:0,favorites:[]};
    alert('Logged out')
  }


  

}
