import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';
import { Event } from '../../class/event.class';

@Component({
  selector: 'planit-event',
  template: require('./event.html')
})
export class EventComponent {

    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;
    private eventsOrganized : Event[] = [];
    private eventsParticiped : Event[] = [];
    private showModalAjout : Boolean = false;
    private idEvent;

    constructor(private authentificationService : AuthentificationService, private eventService : EventService, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess(); 
        console.log(this.activatedRoute.snapshot.params['id']);
    }

    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}