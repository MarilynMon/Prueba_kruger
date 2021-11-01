
import { Persona } from 'src/app/models copy/Persona';
import {ApiService} from 'src/app/servicios/api/api.service';
import {SesionComponent} from 'src/app/sesion/sesion.component';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  headers = new Headers({
    'Authorization':'Bearer',
    'Accept' : 'application/json; charset=utf-8',
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin' : '*',
  });
  PersonaArray: Persona[]= [];
  
url:string ="http://localhost:8585/api/persona";
descripcion :string="";
respuesta :string="";
constructor(private api: ApiService, private resp: SesionComponent
  ) {}
ngOnInit(): void
  { this.OnIniciar();
    console.log("Inicio"+this.Bandera);
  }
selectPersona: Persona=new Persona;
Bandera :boolean =this.resp.respuesta;

Usuario: string = "" ;
Clave : string = "" ;

email= new FormControl('',[
  Validators.required,
  Validators.email
]);
/// variables  de validaciones

CadenaRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
CadenaTexto = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;

// inicio funcion para ingresar o actualizar informacion del empleado
Add_Update()
{ 
  debugger;
 /// inicio de validaciones 
  if (this.selectPersona.correo == null || this.selectPersona.apellidos == null ||
      this.selectPersona.cedula == null || this.selectPersona.nombres == null)
  {
     alert("Todos los compos deben estar llenos");
     this.selectPersona = new Persona();
     return;
  }
  if (!this.CadenaRegex.test(this.selectPersona.correo)   )
  {
    alert("el formato del campo correo es incorrecto");
    this.selectPersona = new Persona();
    return;
  }
  if (isNaN(Number(this.selectPersona.cedula) ))
  {
    alert("el campo cedula debe ser numerico");
    this.selectPersona = new Persona();
    return;
  }
  if (this.selectPersona.cedula.length > 10 || this.selectPersona.cedula.length < 10)
  {
    alert("el campo cedula debe contener 10 digitos");
    this.selectPersona = new Persona();
    return;
  }
  if (!this.CadenaTexto.exec(this.selectPersona.apellidos) )
  {
    alert("Apellidos no deben contener números o caracteres especiales");
    this.selectPersona = new Persona();
    return;
  }

  if (!this.CadenaTexto.test(this.selectPersona.nombres))
  {
    alert("Nombres no deben contener números o caracteres especiales");
    this.selectPersona = new Persona();
    return;
  }
  /// fin validaciones

  if(this.selectPersona.id == null)
  {
    this.selectPersona.id=this.PersonaArray.length+1;
    this.api.onIngresar(this.selectPersona).subscribe(data =>{
      console.log(data);});
      alert("Registro Ingresado");
    this.selectPersona = new Persona();
    this.OnIniciar();
  }
  else{
    this.PersonaArray = this.PersonaArray.filter(a=> a!= this.selectPersona);
    console.log (this.PersonaArray);
    this.api.onActualizar(this.selectPersona).subscribe(data =>{
      alert("Registro Actualizado");
    });
    this.selectPersona = new Persona();
    this.OnIniciar();
    
  }
    
}
// fin 

// inicio funcion para crear usuario y contraseña para el empleado
CrearUser()
{ debugger;

  this.respuesta = this.Validar(this.selectPersona);
  if (this.respuesta == "N")
  {
      let rand = Math.floor( Math.random() * (1000 - 1) + 1);

      this.Usuario = "user"+rand;
      this.Clave = "%"+rand + "user%";
      
      this.selectPersona.contras = this.Clave;
      console.log(this.Clave + " - " + this.selectPersona.contras);
      this.selectPersona.usuario = this.Usuario;
      this.api.onActualizar(this.selectPersona).subscribe(data =>{
        alert("Registro Actualizado");
        alert("El usuario se creo: "+ this.Usuario +" con la clave: "+ this.Clave);
      });
  }
  else
  {  alert("Empleado ya posee usuario: "+ this.selectPersona.usuario+ 
          " y la clave: "+  this.selectPersona.contras);
  }
  this.selectPersona = new Persona();
  this.OnIniciar();
}
// fin funcion

// ini funcion para validar si el empleado tiene usuario y clave para no crearle una nueva
Validar (persona: Persona): string 
{
  debugger;

  if (persona.usuario == null && persona.contras == null )
  {
    return "N";
  }
  else
    return "S";
  
}
// fin 


// inicio funcion para seleccionar datos del empleado de la consulta
Editar(persona: Persona)
{
  this.selectPersona=persona;
}
//fin funcion 

// inicio funcion eliminar empleado
Eliminar()
{debugger;
  console.log(this.selectPersona);
  this.api.onDelete(this.selectPersona.id).subscribe( data =>{
    alert("Registro Eliminado");
  });
  this.PersonaArray = this.PersonaArray.filter(a=> a!= this.selectPersona);
  this.selectPersona = new Persona();
  
}
// fin funcion eliminar

// ini funcion iniciar que consulta los registros grabados en base
OnIniciar()
{ this.PersonaArray = [];
  this.selectPersona = new Persona();
  this.api.onInicio().subscribe(data =>{
  for (let i =0; i<= data.length;i++)
  {
    this.selectPersona.id = data[i].id;
    this.selectPersona.nombres = data[i].nombres;
    this.selectPersona.apellidos = data[i].apellidos;
    this.selectPersona.correo = data[i].correo;
    this.selectPersona.cedula = data[i].cedula;
    this.selectPersona.usuario = data[i].usuario;
    this.selectPersona.contras = data[i].contras;
    console.log (data[i].contras);
    this.PersonaArray.push(this.selectPersona);
    this.selectPersona = new Persona();
  }
})
  ;

}
// fin funcion 
}


