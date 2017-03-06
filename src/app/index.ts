//ANGULAR
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing, RootComponent} from './routes';
import { FormsModule }   from '@angular/forms';

//TO DELETE
import {TechsModule} from './techs';

//PRIMENG
import {FieldsetModule, ButtonModule, InputTextModule} from 'primeng/primeng';


//COMPONENTS
import {MainComponent} from './components/main';
import {HeaderComponent} from './header/header';
import {AuthentificationComponent} from './components/authentification';
import {FooterComponent} from './footer/footer';

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
    RootComponent,
    MainComponent,
    HeaderComponent,
    AuthentificationComponent,
    FooterComponent
  ],
  providers: [ 
    AuthentificationService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
