import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL='http://localhost:3000/api';

  constructor(private http: HttpClient,private router:Router) { }
    //una vez inportado el modulo HttpClient desde angular,puedo instanciar esta clase en el constructor para poder usar la propiedad http para poder pedir datos

    //creare un metodo llamado signUp() dentro de mi servicio el cual rcibira un usuario(user) y este usuario sera el que envie mediant el metodo POST, mediante la cual hare un peticion a laURL='http://localhost:3000/api' concatenada con la ruta signup, y el dato a enviar es el objeto users. Esto devolvera un observable. Este signUp() hara la peticion a mi servidor de node
  
     signUp(user){
      return this.http.post<any>(this.URL +'/signup', user);
    }

    signIn(user){
      return this.http.post<any>(this.URL+'/signin',user);
    }

    loggedIn(){
      //para compobar si el usuario esta loggeado o no, de farma sencilla si tiene el token eta loggeado , caso contrario no 
      if(localStorage.getItem('token')){
        return true
      }
    }

    getToken(){
      return localStorage.getItem('token');
    }

    logout(){
      localStorage.removeItem('token');
      this.router.navigate(['/signin'])
    }

}
