import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
import { GeneralService } from 'src/app/service/general.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private dataSvc:DataService, private authSvc:AuthService, private svc: GeneralService, private fb: FormBuilder, private router:Router){

  }

  registrationForm!: FormGroup
  hide=true;

  ngOnInit(): void {
      this.registrationForm = this.createRegForm();
  }

  createRegForm(){
    return this.fb.group({
      email:this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
    })
  }

  register(){
    let email = this.registrationForm.controls['email'].value
    let password = this.registrationForm.controls['password'].value
    this.authSvc.register(email,password).then((v) =>{
      console.log(v); 
      let reg = v;
      if(reg=='true'){
        console.log(password);
        console.log(reg);
        alert("ACCOUNT CREATED SUCCESSFULLY, WELCOME TO THE APP");
        this.router.navigate(['/login'])
      }else{
        alert("email: "+email +" is taken, please use another email");
        this.ngOnInit();
      }
    });
  }

  
}
