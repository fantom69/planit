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
  template: require('./eventspublished.html')
})
export class EventsPublishedComponent {

    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;
    private eventsPublished : Event[] = [];
    private showModalAjout : Boolean = false;
    private selectedEvent : Event;
    private showModalDelete : Boolean = false;
    private showModalReedite : Boolean = false;

    

    constructor(private authentificationService : AuthentificationService, private router: Router, private eventService : EventService){
        this.loadListeEventPublished();
    }

    loadListeEventPublished(){
        this.eventService.getAllEventsPublished()
        .then(result => {
            this.eventsPublished = result;
        })
        .catch(
        );
    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess();
    }

    showModalDeleteEvent(event : Event){
        this.selectedEvent = event;
        this.showModalDelete = true;
    }

    showModalReediteEvent(event : Event){
        this.selectedEvent = event;
        this.showModalReedite = true;
    }

    reediteEvent(){
        this.eventService.reediteEvent(this.selectedEvent)
        .then(res => {
            if(res){
                this.showToastr("5000", "success", "L'évènement peut de nouveau être édité", "");
                
            }
            else{
                this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue, l'évènement n'a pas pu être supprimé");
            }
            this.router.navigate(["/eventsedited"]);
        })
        .catch(

        );
    }


    deleteEvent(){
        this.eventService.removeEvent(this.selectedEvent)
        .then(res => {
            if(res){

                this.showToastr("5000", "success", "L'évènement a bien été supprimé", "");
            }
            else{
                this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue, l'évènement n'a pas pu être supprimé");
            }

            this.loadListeEventPublished();
            this.showModalDelete = false;
        })
        .catch(

        );
    }

    newEvent(){
        this.router.navigate(["/event"]);
    }

    showOverlayDetailsEvent(event, evenement : Event, overlaypanel: OverlayPanel) {
        this.selectedEvent = evenement;
        overlaypanel.toggle(event);
    }

    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
