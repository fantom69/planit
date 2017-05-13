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
  template: require('./eventsedited.html')
})
export class EventsEditedComponent {

    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;
    private eventsOrganized : Event[] = [];
    private eventsParticiped : Event[] = [];
    private showModalAjout : Boolean = false;
    private selectedEvent : Event;
    private showModalDelete : Boolean = false;

    constructor(private authentificationService : AuthentificationService, private router: Router, private eventService : EventService){
        this.loadListeEventEdited();
    }

    loadListeEventEdited(){
        this.eventService.getAllEventsEdited()
        .then(result => {
            this.eventsOrganized = result;

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

    showModalDeleteEvent(event : Event){
        this.selectedEvent = event;
        this.showModalDelete = true;
    }



    deleteEvent(event : Event){
        this.eventService.removeEvent(this.selectedEvent)
        .then(res => {
            if(res){

                this.showToastr("5000", "success", "L'évènement a bien été supprimé", "");
            }
            else{
                this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue, l'évènement n'a pas pu être supprimé");
            }

            this.loadListeEventEdited();
            this.showModalDelete = false;
        })
        .catch(

        );
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
