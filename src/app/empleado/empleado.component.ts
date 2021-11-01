import { Component, OnInit } from '@angular/core';

import { Persona } from 'src/app/models copy/Persona';
import {ApiService} from 'src/app/servicios/api/api.service';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent{
  headers = new Headers({
    'Authorization':'Bearer',
    'Accept' : 'application/json; charset=utf-8',
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin' : '*',
  });
  PersonaArray: Persona[]= [];
url:string ="http://localhost:8585/api/persona";
descripcion :string="";
constructor(private api: ApiService){

}
ngOnInit ()
  { this.OnIniciar();
  }
selectPersona: Persona=new Persona;

Add_Update()
{ //me refiethis.OnInicio();
  debugger;
  console.log(this.selectPersona.id);
    this.PersonaArray = this.PersonaArray.filter(a=> a!= this.selectPersona);
    console.log (this.PersonaArray);
    this.api.onActualizar(this.selectPersona).subscribe(data =>{
      alert("Registro Actualizado");
    });
    this.selectPersona = new Persona();
    this.OnIniciar();
}

Editar(persona: Persona)
{
  this.selectPersona=persona;
}

OnIniciar()
{ this.PersonaArray = [];
  this.selectPersona = new Persona();
  this.api.onInicio().subscribe(data =>
    {
        for (let i =0; i<= data.length;i++)
        {
          this.selectPersona.id = data[i].id;
          this.selectPersona.nombres = data[i].nombres;
          this.selectPersona.apellidos = data[i].apellidos;
          this.selectPersona.correo = data[i].correo;
          this.selectPersona.cedula = data[i].cedula;
          this.selectPersona.usuario = data[i].usuario;
          this.selectPersona.contras = data[i].contras;
          this.selectPersona.fecha = data[i].fecha;
          this.selectPersona.direccion = data[i].direccion;
          this.selectPersona.telefono = data[i].telefono;
          this.selectPersona.estado_vac = data[i].estado_vac;
          console.log (data[i].contras);
          this.PersonaArray.push(this.selectPersona);
          this.selectPersona = new Persona();
        }
    })
  ;

}
}



