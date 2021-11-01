import { Injectable } from '@angular/core';
import {responseI} from 'src/app/models copy/response';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models copy/Persona';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  headers = new Headers({
    'Authorization':'Bearer',
    'Accept' : 'application/json; charset=utf-8',
    'Content-Type':'application/json; charset=utf-8',
    'Access-Control-Allow-Origin' : '*',
  });

  ngOnInit(): void{ this.onInicio();}
   
url:string ="http://localhost:8585/api/persona/";
url2:string ="http://localhost:8585/api/persona/";

descripcion :string="";
  constructor( public http:HttpClient) { }
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})
};

  onInicio():Observable<responseI[]>{
    let direccion = this.url;
    
    console.log(this.http.get<responseI[]>(direccion));
    return this.http.get<responseI[]>(direccion);
  }
  onIngresar(persona:Persona):Observable<any>{
    
    debugger;
    let direccion = this.url;
    return this.http.post<any>(direccion,persona);

       // return this.http.post(`${direccion}`, blog,{headers: this.headers});

  }

  onActualizar(persona:Persona):Observable<any>{
    
    //debugger;
    let direccion = this.url;
    return this.http.put<any>(direccion,persona);

  }
  onIniciarSesion(user:string,clave:string):string{
    if (user == "admin" && clave=="admin")
    {
        return "S"
    }
    else 
    {
      return "N"
    }
  }
  onDelete(id:any){
    debugger;
    let direccion = this.url+id;
    return this.http.delete(direccion,id);//(direccion+id,id);
  }
}
