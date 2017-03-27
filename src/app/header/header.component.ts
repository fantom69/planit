import {Component, Input}           from '@angular/core';
import { Router }                   from '@angular/router';
import { AuthentificationService }  from '../services/authentification.service';
import { User }                     from '../class/user.class';

@Component({
  selector: 'planit-header',
  template: require('./header.html')
})

export class HeaderComponent {
  @Input()
  user: User = undefined; 

  constructor(private router: Router, private authentificationService : AuthentificationService) {
  }

  ngAfterContentChecked(){ // recup du user une fois que le contenu chargé
    this.user = this.authentificationService.user;  
  }
  
  logout(){
     this.authentificationService.logout();
     this.router.navigate(['/login']);
  }
}
