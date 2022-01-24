import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

// Importar SweetAlert
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : UsuarioModel;  //Instancia para manejar los datos
  recordarme : boolean = false;

  constructor(private auth : AuthService,
              private router : Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {

      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }



  login(form : NgForm) {     
    if (form.invalid) { return };

    //console.log(form);
    //console.log(this.usuario);

    Swal.fire({
      allowOutsideClick : false,
      text: 'Espere por favor..',
      icon : 'info'
    });

    Swal.showLoading();

   
    this.auth.login(this.usuario)
        .subscribe(data=>{
           console.log(data);
           Swal.close();

            // El usuario esta validado y recordarme marcado

            if (this.recordarme){
              localStorage.setItem('email', this.usuario.email)
            }

           this.router.navigateByUrl('/home');
        }, err=>{
          console.log(err.error.error.message);
          Swal.fire({
            allowOutsideClick : false,
            icon : 'error',
            title :'Error al autenticar',
            text: err.error.error.message         
          });
        })

  }

}
