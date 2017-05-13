//ANGULAR
import {NgModule}                   from '@angular/core';
import {BrowserModule}              from '@angular/platform-browser';
import {routing}                    from './app.routing';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';

//PRIMENG
import {SplitButtonModule, ListboxModule, InputTextareaModule, GMapModule, CalendarModule, CheckboxModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, GrowlModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, ChartModule, UIChart, SelectItem, DataTableModule, DropdownModule, MultiSelectModule, InputSwitchModule} from 'primeng/primeng';

//COMPONENTS
import {AppComponent}               from './app.component'
import {HeaderComponent}            from './header/header.component';
import {AuthentificationComponent}  from './components/authentification/authentification.component';
import {CreationCompteComponent}    from './components/creacompte/creationcompte.component';
import {EventsEditedComponent}      from './components/eventsedited/eventsedited.component';
import {InvitationsComponent}       from './components/invitations/invitations.component';
import {EventsPublishedComponent}   from './components/eventspublished/eventspublished.component';
import {EventComponent}             from './components/event/event.component';
import {FooterComponent}            from './footer/footer.component';

//SERVICES
import { AuthentificationService }  from './services/authentification.service';
import { EventService }             from './services/event.service';
import { FacebookService }          from 'ng2-facebook-sdk';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    SplitButtonModule,
    GrowlModule,
    SharedModule,
    DialogModule,
    ChartModule,
    DataTableModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    ConfirmDialogModule,
    SelectButtonModule,
    OverlayPanelModule,
    GMapModule,
    InputSwitchModule,
    InputTextareaModule,
    CalendarModule,
    ListboxModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthentificationComponent,
    CreationCompteComponent,
    InvitationsComponent,
    EventsPublishedComponent,
    EventsEditedComponent,
    EventComponent,
    FooterComponent
  ],
  providers: [
    AuthentificationService,
    EventService,
    FacebookService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
