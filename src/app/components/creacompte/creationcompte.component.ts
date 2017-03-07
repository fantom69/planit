import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule} from 'primeng/primeng';

@Component({
  selector: 'planit-creacompte',
  template: require('./creationcompte.html')
})
export class CreationCompteComponent {

  email: string;
  password: string;

  constructor(){

  }

  creation(){
    
  }

}
