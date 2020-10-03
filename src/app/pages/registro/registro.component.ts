import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

// Importrar SweetAlert
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : UsuarioModel;  //Instancia para manejar los datos
  recordarme : boolean = false;

  constructor(private auth : AuthService,
              private router : Router) { }

  ngOnInit() { 
  
      this.usuario = new UsuarioModel(); //Inicializar la variable


  }

  onSubmit(form : NgForm){

    if (form.invalid) {return;} //Si el formulario no es valido me salgo
    
    //console.log("Formulario Enviado..");
    //console.log(this.usuario);
    //console.log(form);

    Swal.fire({
      allowOutsideClick : false,
      text: 'Espere por favor..',
      icon : 'info'
    });

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp =>{
          console.log(resp);
         // Swal.fire({
         //   icon : 'success',
         //   title :'Registro Usuario',
         //   text: 'Usuario Creado correctamente'        
        //  });
        Swal.close();

        if (this.recordarme){
          localStorage.setItem('email', this.usuario.email)
        }
        this.router.navigateByUrl('/home');
    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon : 'error',
        title :'Error al registrar',
        text: err.error.error.message         
      });
    });


  }
   

}
