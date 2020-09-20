import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel;  //Instancia para manejar los datos

  constructor() { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form : NgForm) { 
    if (form.invalid) { return };

    console.log(form);
    console.log(this.usuario);
  }

}
