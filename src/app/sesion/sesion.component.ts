import { Component, OnInit } from '@angular/core';
import {ApiService} from 'src/app/servicios/api/api.service';
@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {

  headers = new Headers({
    'Authorization':'Bearer',
    'Accept' : 'application/json; charset=utf-8',
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin' : '*',
  });
  clave: string ="";
  usuario: string =""; 
   
url:string ="http://localhost:8585/api/usuario";
descripcion :string="";
constructor(private api: ApiService ){

}
ngOnInit ()
  { //this.OnIniciar();
  }

   respuesta: boolean=false;

IniciarSesion()
{
  this.usuario = ((document.getElementById("user") as HTMLInputElement).value);
  this.clave = ((document.getElementById("clave") as HTMLInputElement).value);
  let resp = this.api.onIniciarSesion(this.usuario,this.clave);
  if (resp = 'S'){
    this.respuesta = true;
    alert("Usted tiene Perfil Administrador")
  }
  else
  {
    alert("Usted tiene Perfil Empleado")

  }
  
  console.log(this.respuesta);
  
}

}



