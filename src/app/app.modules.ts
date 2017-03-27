//ANGULAR
import {NgModule}                   from '@angular/core';
import {BrowserModule}              from '@angular/platform-browser';
import {routing}                    from './app.routing';
import { FormsModule }              from '@angular/forms';
import { HttpModule }               from '@angular/http';
//TO DELETE
//import {TechsModule} from './techs';

//PRIMENG
import {FieldsetModule, ButtonModule, Message, InputTextModule, GrowlModule} from 'primeng/primeng';


//COMPONENTS
import {AppComponent}               from './app.component'
import {HeaderComponent}            from './header/header.component';
import {AuthentificationComponent}  from './components/authentification/authentification.component';
import {CreationCompteComponent}    from './components/creacompte/creationcompte.component';
import {HomeComponent}              from './components/home/home.component';
import {FooterComponent}            from './footer/footer.component';

//SERVICES
import { AuthentificationService }  from './services/authentification.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    FieldsetModule,
    GrowlModule,
    ButtonModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthentificationComponent,
    CreationCompteComponent,
    HomeComponent,
    FooterComponent
  ],
  providers: [ 
    AuthentificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
