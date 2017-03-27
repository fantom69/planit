import {Component}                                              from '@angular/core';
import { AuthentificationService }                              from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule, GrowlModule, Message} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators }      from '@angular/forms';
import { Router}                                                from '@angular/router';
import { User }                                                 from '../../class/user.class';

@Component({
  selector: 'planit-creacompte',
  template: require('./creationcompte.html')
})
export class CreationCompteComponent {

  private user : User;
  private passwordVerif : string;

  private msgToast: Message[] = [];
  private durationToast: String;
  private colorToast: String;

  constructor(private router: Router, private authentificationService : AuthentificationService){
    this.user = new User();
  }


  creation(){
    if(this.user.mail.length < 10 || this.user.nom.length <5 || this.user.prenom.length <5 || this.user.password.length <5){
        this.showToastr("5000", "warn", "Attention", "Certains champs sont incomplets");
    }
    else{
      if(this.passwordVerif == this.user.password){
        this.authentificationService.creationCompte(this.user)
        .then(result => {
           if(result == true){
             this.showToastr("5000", "success", "Félicitations", "L'utilisateur a bien été ajouté");
             this.router.navigate(['/home']);
           }
           else{
             this.showToastr("5000", "warn", "Attention", "Cette adresse mail est déjà associée à un compte");
           }
        })
        .catch(
        );
      }
      else{
        this.showToastr("5000", "warn", "Attention", "Les deux mots de passe ne sont pas identiques");
      }
    }
  }

  showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
