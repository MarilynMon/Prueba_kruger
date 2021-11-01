import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { InicioComponent } from './inicio/inicio.component';
import { SesionComponent } from './sesion/sesion.component';

export const routes: Routes = [
  {path:'',redirectTo:'sesion',pathMatch:'full'},
 { path: 'inicio', component: AppComponent },
 { path: 'sesion', component: SesionComponent },
  { path: 'admin', component: InicioComponent },
  { path: 'empleado', component: EmpleadoComponent }

];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioComponent,AppComponent,SesionComponent,EmpleadoComponent]
