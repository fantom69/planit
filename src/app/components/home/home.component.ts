import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';
import { Event } from '../../class/event.class';
import { Router} from '@angular/router';

@Component({
  selector: 'planit-home',
  template: require('./home.html')
})
export class HomeComponent {

    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;
    private eventsOrganized : Event[] = [];
    private eventsParticiped : Event[] = [];
    private showModalAjout : Boolean = false;

    constructor(private authentificationService : AuthentificationService, private router: Router, private eventService : EventService){
        this.loadListeEventOrganized();
        this.loadListeEventParticiped();
    }

    loadListeEventOrganized(){
        this.eventService.getAllEventsOrganized()
        .then(result => {
            this.eventsOrganized = result;

        })
        .catch(
        );
    }

    loadListeEventParticiped(){
        this.eventService.getAllEventsParticiped()
        .then(result => {
            this.eventsParticiped = result;

        })
        .catch(
        );
    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess(); 
    }

    updateEvent(event : Event){
        this.router.navigate(["/event/"+event.idEvenement]);
    }

    newEvent(){
        this.router.navigate(["/event"]);
    }

    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}