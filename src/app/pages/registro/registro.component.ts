import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : UsuarioModel;  //Instancia para manejar los datos

  constructor() { }

  ngOnInit() { 
  
      this.usuario = new UsuarioModel(); //Inicializar la variable

      this.usuario.email ="pruebacorreo@gmail.com";
      this.usuario.nombre="prueba";
      this.usuario.password="123456";

  }

  onSubmit(){
    console.log("Formulario Enviado..");
    console.log(this.usuario);
  }


}
