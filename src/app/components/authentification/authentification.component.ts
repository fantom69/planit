import {Component}                                              from '@angular/core';
import { AuthentificationService }                              from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule, Message} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators }      from '@angular/forms';
import { Router}                                                from '@angular/router';
import { User }                                                 from '../../class/user.class';

@Component({
  selector: 'planit-authentification',
  template: require('./authentification.html')
})
export class AuthentificationComponent {

  private user : User;
  private msgToast: Message[] = [];
  private durationToast: String;
  private colorToast: String;

  constructor(private router: Router, private authentificationService : AuthentificationService){
    this.user = new User();
  }


  login(){
    if(this.user.mail.length < 10 ||  this.user.password.length <5){
        this.showToastr("5000", "warn", "Attention", "Certains champs sont incomplets");
    }
    else{
        this.authentificationService.login(this.user)
        .then(result => {
           if(result == true){
             this.showToastr("5000", "success", "Félicitations", "Authentification réussie");
             this.router.navigate(['/home']);
           }
           else{
             this.showToastr("5000", "warn", "Attention", "Authentification invalide");
           }
        })
        .catch(

        );
    }
  }


  showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
