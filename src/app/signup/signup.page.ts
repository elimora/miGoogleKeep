import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={};
  private upArray =[
    {
      imageURL:'https://www.getminute.com/wp-content/uploads/2016/06/signup-blue.png',
      commentes:['ingresa aqui']
    }  
  ]
  constructor(
    private authService:AuthService, 
    private router:Router) { }

  ngOnInit() {
  }
  //metodo que me permitira manejar el signUp
  signUp(){
    this.authService.signUp(this.user)//peticion
      .subscribe(
        res =>{
          console.log(res.token)
          localStorage.setItem('token',res.token)//guardando el token el localstore
          this.router.navigate(['/private-tasks'])
        },
        err =>console.log(err)
      )                    //respuesta del servidor

  }

}
