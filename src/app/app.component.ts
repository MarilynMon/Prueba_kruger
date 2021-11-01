
import {ApiService} from 'src/app/servicios/api/api.service';
import { Component, Input } from '@angular/core';
import{SesionComponent} from '../app/sesion/sesion.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
{
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
constructor(private api: ApiService , private resp: SesionComponent){

}
Bandera :string="";
ngOnInit ()
  { 
  }
  
  
  
 // @Input() Bandera: string= "S";//this.resp.respuesta;


}



