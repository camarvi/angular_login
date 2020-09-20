import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';

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


  }

  onSubmit(form : NgForm){

    if (form.invalid) {return;} //Si el formulario no es valido me salgo
    
    console.log("Formulario Enviado..");
    console.log(this.usuario);
    console.log(form);
  }


}
