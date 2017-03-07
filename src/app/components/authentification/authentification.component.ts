import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule} from 'primeng/primeng';

@Component({
  selector: 'planit-authentification',
  template: require('./authentification.html')
})
export class AuthentificationComponent {

  email: string;
  password: string;

  constructor(private authentificationService : AuthentificationService){

  }

  login(){
    this.authentificationService.login(this.email, this.password);
  }
}
