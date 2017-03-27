import {Component}                  from '@angular/core';
import {RouterModule, Routes}       from '@angular/router';
import {AuthentificationComponent}  from './components/authentification/authentification.component';
import {CreationCompteComponent}    from './components/creacompte/creationcompte.component';
import {HomeComponent}              from './components/home/home.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: AuthentificationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'creation', component: CreationCompteComponent }
];

export const routing = RouterModule.forRoot(routes);
