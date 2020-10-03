import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1';
  private apikey = '--------------------------------------';

  //Variable donde guardamos el token del usuario validado

  userToken : string;


  //Crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login Usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
      //Cuando entramos ya sabemos si existe un token
      this.leerToken();
   }

  logout(){

    localStorage.removeItem('token');

  }

  login(usuario : UsuarioModel){

      const authData = {
        email : usuario.email,
        password : usuario.password,
        returnSecureToken : true
      };

      return this.http.post
      (`${ this.url}/accounts:signInWithPassword?key=${ this.apikey }`, 
      authData).pipe( //Si hay un error nunca se dispara el map
        map(resp => {
         
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }

  nuevoUsuario( usuario : UsuarioModel){

    const authData = {
      email : usuario.email,
      password : usuario.password,
      returnSecureToken : true
    };

    return this.http.post(
      `${ this.url }/accounts:signUp?key=${ this.apikey }`,
      authData).pipe( //Si hay un error nunca se dispara el map
        map(resp => {
         
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }


  private guardarToken( idToken : string){

    this.userToken = idToken;
    
    //Almacenar el token en el localstorage

    localStorage.setItem('token', idToken);

    //Validacion de la fecha

    let hoy = new Date();
    hoy.setSeconds(3600);
    // almaceno la fecha en la que expira el token
    localStorage.setItem('expira', hoy.getTime().toString());


  }

  leerToken(){

    if ( localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {   // Sino existe
      this.userToken = '';
    }
    
    return this.userToken;

  }

  estaAutenticado() : boolean {

    if (this.userToken.length<2){
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()){
      return true;
    } else {
      return false;
    }


  }

}
