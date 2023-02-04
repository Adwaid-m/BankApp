


import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  acno1:any
  pswd1:any
  acno2: any;
  pswd2: any;
  amount1: any;
  user:any;
  sdate:any;
  

  constructor(private ds:DataService,private router:Router,private fb:FormBuilder,private http:HttpClient){
    if(localStorage.getItem('currentuser')){
      this.user=(localStorage.getItem('currentuser')||'')
      this.sdate= Date();
      console.log(localStorage);
      
    }
    
  
    

}


 

  depositForm=this.fb.group({
    acno1:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd1:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
    
  })

  withdrawForm=this.fb.group({
    acno2:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd2:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount1:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })


  ngOnInit(): void {
    if(!localStorage.getItem('currentAcno')){
      alert('please login first')
      this.router.navigateByUrl('')
    }
  }
 

deposit(){
  var acno =this.depositForm.value.acno1;
  var password =this.depositForm.value.pswd1;
  var amount=this.depositForm.value.amount;
  var currentAcno= JSON.parse(localStorage.getItem('currentAcno')||'')
  if(this.depositForm.valid){
    if(currentAcno == acno){
      this.ds.deposit(acno,password,amount).subscribe(
        (result:any)=>{
          alert(result.message)
        },
        result=>{
          alert(result.error.message)
        }
      )
     }else{
       alert('User is invalid')
    }
    
    
//  if(result){
//     alert(`${amount} is credited to  the account ${acno} and balance is ${balance}`);
//   }
//   else{
//     alert("invalid details");
//     console.log(this.depositForm.get('acno')?.errors);
//   }
  }
}

withdraw(){
  var acno =this.withdrawForm.value.acno2;
  var password =this.withdrawForm.value.pswd2;
  var amount=this.withdrawForm.value.amount1;
  var currentAcno= JSON.parse(localStorage.getItem('currentAcno')||'')

  // const result=this.ds.withdraw(acno,password,amount)
  if(this.withdrawForm.valid){
    if(currentAcno == acno){
      this.ds.withdraw(acno,password,amount).subscribe(
        (result:any)=>{
          alert(result.message)
        },
        result=>{
          alert(result.error.message)
        }
      )
    }
    else{
      alert('user is not found')
    }
    this.ds.withdraw(acno,password,amount).subscribe(
      (result:any)=>{
        alert(result.message)
      },
      result=>{
        alert(result.error.message)
      }
    )
  // if(result){
  //   alert(`${amount} is debited to  the account ${acno} and balance is ${result}`);
  // }
  // else{
  //   alert("invalid details");
  //   console.log(this.withdrawForm.get('acno')?.errors);
  // }
}
}

logout(){
  localStorage.removeItem('currentuser');
  localStorage.removeItem('currentAcno');
  this.router.navigateByUrl('')
}

delete(){
  this.acno1=JSON.parse(localStorage.getItem('currentAcno')||'');
}

onCancel(){
  this.acno1=""
}
onDelete(event:any){
  // alert(event)
  this.ds.deleteAcc(event).subscribe(
    (result:any)=>{
      alert(result.message)
      this.router.navigateByUrl('')
    },
    result=>{
      alert(result.error.message)
    }
  )
}

}