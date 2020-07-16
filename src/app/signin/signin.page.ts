import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router'
import { from } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  user={}
  private upArray =[
    {
      imageURL:'https://www.getminute.com/wp-content/uploads/2016/06/signup-blue.png',
      commentes:['ingresa aqui']
    }  
  ]

  constructor(
    private authService:AuthService,
    private router :Router
  ) { }

  ngOnInit() {
  }

  signIn(){
    this.authService.signIn(this.user)
    .subscribe(
      res=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/private-tasks'])
      },
      err=>{
        console.log(err)
      }
    )
  }


}
