import {Component}                                              from '@angular/core';
import { AuthentificationService }                              from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule, Message} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators }      from '@angular/forms';
import { Router}                                                from '@angular/router';
import { User }                                                 from '../../class/user.class';
import {FacebookService, FacebookLoginResponse, FacebookInitParams}                 from 'ng2-facebook-sdk';

@Component({
  selector: 'planit-authentification',
  template: require('./authentification.html')
})
export class AuthentificationComponent {

  private user : User;
  private msgToast: Message[] = [];
  private durationToast: String;
  private colorToast: String;

  constructor(private router: Router, private authentificationService : AuthentificationService, private fb: FacebookService){
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
             this.router.navigate(['/eventsedited']);
           }
           else{
             this.showToastr("5000", "warn", "Attention", "Authentification invalide");
           }
        })
        .catch(

        );
        //
        /*let fbParams: FacebookInitParams = {
                                   appId: '1440938899289494',
                                   xfbml: true,
                                   version: 'v2.8'
                                   };
        this.fb.init(fbParams);
        this.fb.login().then(
          (response: FacebookLoginResponse) => console.log(response),
          (error: any) => console.error(error)
        );*/
    }
  }


  showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
