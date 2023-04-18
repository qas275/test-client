import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private dataSvc:DataService) { }

  async checkLogin(email:string, password: string){
    let params =  new HttpParams().set('email', email).set('password', password);
    let body = {"email": email,"password":password}
    let response = await lastValueFrom(this.http.post<any>('https://curly-friction-production.up.railway.app/auth/login',body)).then(
      (res) =>{
        return res;
      }
    );
    return JSON.parse(JSON.stringify(response));
  }

  async register(email:string, password: string){
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    let params =  new HttpParams().set('email', email).set('password', password);
    let response = await lastValueFrom(this.http.post<any>('https://curly-friction-production.up.railway.app/auth/register',params.toString(), {headers:headers})).then( //auto convert to json
      (res) =>{
        console.log(res);
        return res.registration; //won't report error here due to any typecast so need to make sure property is correct
      }
    );
    return response;
  }

  jwtCheck(){
    if(!!sessionStorage.getItem("WS_JWT")){
      return true
    }
    return false
  }
}
