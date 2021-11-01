import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { InicioComponent } from './inicio/inicio.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { SesionComponent } from './sesion/sesion.component'
import { RouterLink, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path:'',redirectTo:'sesion',pathMatch:'full'},
  { path: 'inicio', component: AppComponent },
  { path: 'sesion', component: SesionComponent },
   { path: 'admin', component: InicioComponent },
   { path: 'empleado', component: EmpleadoComponent }
 
 ];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    EmpleadoComponent,
    SesionComponent
  ],
  imports: [RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SesionComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
function forRoot(routes: Routes, arg1: { enabledTracing: boolean; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
  throw new Error('Function not implemented.');
}

