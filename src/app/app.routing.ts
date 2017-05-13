import {Component}                  from '@angular/core';
import {RouterModule, Routes}       from '@angular/router';
import {AuthentificationComponent}  from './components/authentification/authentification.component';
import {CreationCompteComponent}    from './components/creacompte/creationcompte.component';
import {EventsEditedComponent}      from './components/eventsedited/eventsedited.component';
import {EventComponent}             from './components/event/event.component';
import {InvitationsComponent}       from './components/invitations/invitations.component';
import {EventsPublishedComponent}   from './components/eventspublished/eventspublished.component';


export const routes: Routes = [
  { path: '', redirectTo: '/eventsedited', pathMatch: 'full' },
  { path: 'login', component: AuthentificationComponent },
  { path: 'event', component: EventComponent},
  { path: 'event/:id', component: EventComponent},
  { path: 'eventsedited', component: EventsEditedComponent },
  { path: 'invitations', component: InvitationsComponent },
  { path: 'eventspublished', component: EventsPublishedComponent },
  { path: 'creation', component: CreationCompteComponent }
];

export const routing = RouterModule.forRoot(routes);
