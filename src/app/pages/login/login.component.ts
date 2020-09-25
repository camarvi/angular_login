import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel;  //Instancia para manejar los datos

  constructor(private auth : AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form : NgForm) {     
    if (form.invalid) { return };

    //console.log(form);
    //console.log(this.usuario);

    this.auth.login(this.usuario)
        .subscribe(data=>{
           console.log(data);
        }, err=>{
          console.log(err.error.error.message);
        })

  }

}
