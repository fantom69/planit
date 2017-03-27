import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import {FieldsetModule, ButtonModule, InputTextModule, GrowlModule, Message} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';

@Component({
  selector: 'planit-home',
  template: require('./home.html')
})
export class HomeComponent {

    private msgToast: Message[] = [];
    private durationToast: String;

    constructor(private authentificationService : AuthentificationService){
    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess(); //aucune autorisations spécifiques
    }

    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}