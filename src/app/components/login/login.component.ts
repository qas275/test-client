import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  email = '';
  hide=true;

  constructor(private svc:GeneralService, private authSvc:AuthService, private dataSvc:DataService, private formbuilder: FormBuilder, private router:Router){
    
  }

  ngOnInit(): void {
    console.log("LOGIN LOADING")
    this.loginForm = this.createLoginForm();  
    console.log(sessionStorage.getItem("WS_JWT"))
  }

  createLoginForm(){
    return this.formbuilder.group({
      email: this.formbuilder.control(this.email, [Validators.required]),
      password: this.formbuilder.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  authenticate(){
    this.email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    this.authSvc.checkLogin(this.email,password).then((v) =>{
      console.log(v); 
      if(v.login=='true'){
        this.dataSvc.svcUser.email = this.email;
        console.log("Logged in with "+this.email+password);
        sessionStorage.setItem('email', this.email)
        sessionStorage.setItem('WS_JWT', v.jwt)
        this.router.navigate(['/home'])
      }else{
        alert("email: "+this.email+ " and password "+password+" does not exist or not match");
        this.ngOnInit();
      }
    });
  }

  async load(email:string){
    await this.svc.loadFavourties(email);
  }
}
