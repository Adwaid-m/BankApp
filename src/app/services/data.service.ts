


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
}) 
export class DataService {
  // getTransaction(acno: any){
  //   return this.UserDetails[acno].transaction;
  // }
  UserDetails:any={
    1000:{acno:1000,username:"abhi",password:1000,balance:2000,transaction:[]},
    1001:{acno:1001,username:"adwaid",password:1001,balance:2000,transaction:[]},
    1002:{acno:1002,username:"pranav",password:1002,balance:2000,transaction:[]}
  }
  currentuser: any;
  currentAcno: any;

  constructor(private http:HttpClient) { 
    // this.getDetails()
  }



  saveDetails(){
    // Database
    if(this.UserDetails){
      localStorage.setItem('Database',JSON.stringify(this.UserDetails))
    }
    // Currentuser
    if(this.UserDetails){
      localStorage.setItem('currentuser',JSON.stringify(this.currentuser))
    }
    // currentAcno
    if(this.UserDetails){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }
  }

  // getDetails(){
  //   // Database
  //   if(localStorage.getItem('Database')){
  //     this.UserDetails = JSON.parse(localStorage.getItem('Database')||'')
  //   }
  //   // currentuser
  //   if(localStorage.getItem('currentuser')){
  //     this.currentuser = JSON.parse(localStorage.getItem('currentuser')||'')
  //   }
  //   // currentAcno
  //   if(localStorage.getItem('currentAcno')){
  //     this.currentAcno= JSON.parse(localStorage.getItem('currentAcno')||'')
  //   }
  // }




  register(acno:any,username:any,password:any){
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:3000/register',body)
    // let UserDetails=this.UserDetails;

    // if(acno in UserDetails)
    // {
    //   return false;

    // }
    // else{
    //   UserDetails[acno]={
    //     acno:acno,
    //     username:username,
    //     password:password,
    //     balance:2000,
    //     transaction:[]
    //   }
    //   this.saveDetails();
    //   return true;
    // }


  }

  login(acno:any,password:any){
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:3000/login',body)



    // let UserDetails=this.UserDetails;
    // if(acno in UserDetails)
    // {
    //   if(pswd==UserDetails[acno]['password'])
    //   {
    //     this.currentuser=this.UserDetails[acno]['username'];
    //     this.currentAcno=acno;
    //     this.saveDetails();
    //     return true;
    //   }
    //   else{
    //     alert('invalid password');
    //     return false;
    //   }
    // }
    // else{
    //   alert('invalid user details');
    //   return false;
    // }
  }

  getToken(){
    const token =JSON.parse(localStorage.getItem('Token')||'')
    let headers=new HttpHeaders()
    if(token){
      options.headers=headers.append('x-access-token',token);
    }
    return options
  }

  //deposit call
  deposit(acno:any,password:any,amnt:any){
    const body={
      acno,
      password,
      amount:amnt
    }
    return this.http.post('http://localhost:3000/deposit',body,this.getToken())

    // let UserDetails= this.UserDetails;
    // if(acno in UserDetails)
    // {
    //   if(pswd==this.UserDetails[acno]['password'])
    //   {
    //     UserDetails[acno]['balance'] += amount;
    //     UserDetails[acno]['transaction'].push({
    //       type:"Credit",
    //       amount
    //     })
    //     this.saveDetails();
    //     return UserDetails[acno]['balance']
    //   }
    //   else{
    //     alert('invalid password');
    //     return false;
    //   }

    // }
    // else{
    //   alert('invalid userdetails');
    //   return false;
    // }
  }

  withdraw(acno:any,password:any,amnt:any){
    const body={
      acno,
      password,
      amount:amnt
    }
    return this.http.post('http://localhost:3000/withdraw',body,this.getToken())
  }
  // {
  //   var amount=parseInt(amnt);
  //   let UserDetails= this.UserDetails;
  //   if(acno in this.UserDetails)
  //   {
  //     if(password==this.UserDetails[acno]['password'])
  //     {
  //       if(UserDetails[acno]['balance']>=amount)
  //       {
  //         UserDetails[acno]['balance'] -= amount;
  //         UserDetails[acno].transaction.push({
  //           type:'Debit',
  //           amount
  //         })
  //         this.saveDetails();
  //         return UserDetails[acno]['balance']
  //       }
        
  //     }
  //     else{
  //       alert('invalid password');
  //       return false;
  //     }

  //   }
  //   else{
  //     alert('invalid userdetails');
  //     return false;
  //   }
  // }
  getTransaction(acno:any){
    const body={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',body,this.getToken())
  }


  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno)
  }
}

