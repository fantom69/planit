//ANGULAR
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './app.routing';
import { FormsModule }   from '@angular/forms';

//TO DELETE
import {TechsModule} from './techs';

//PRIMENG
import {FieldsetModule, ButtonModule, InputTextModule} from 'primeng/primeng';


//COMPONENTS
import {AppComponent} from './app.component'
import {HeaderComponent} from './header/header.component';
import {AuthentificationComponent} from './components/authentification/authentification.component';
import {CreationCompteComponent} from './components/creacompte/creationcompte.component';
import {FooterComponent} from './footer/footer.component';

//SERVICE
import { AuthentificationService } from './services/authentification.service';

@NgModule({
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    TechsModule,
    FieldsetModule,
    ButtonModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthentificationComponent,
    CreationCompteComponent,
    FooterComponent
  ],
  providers: [ 
    AuthentificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
