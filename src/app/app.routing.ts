import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthentificationComponent} from './components/authentification/authentification.component';
import {CreationCompteComponent} from './components/creacompte/creationcompte.component';

export const routes: Routes = [
  {
    path: 'login', component: AuthentificationComponent
  },
  {
    path: 'creation', component: CreationCompteComponent
  }
];

export const routing = RouterModule.forRoot(routes);
