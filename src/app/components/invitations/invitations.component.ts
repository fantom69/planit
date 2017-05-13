import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';
import { Event } from '../../class/event.class';
import { Router} from '@angular/router';

declare var google: any;

@Component({
  selector: 'planit-home',
  template: require('./invitations.html')
})
export class InvitationsComponent {

   
    private eventsParticiped : Event[] = [];
    private participationVisible : Boolean = true;
    private event : Event = new Event();

    //MAP API
    //Position par defaut
    private options: any = {
      center: {lat: 46.98887141245888, lng: 3.15582275390625},
      zoom: 10
    };

    private map: any;
    private overlays: any[] = [];
    private markerTitle: string;
    private selectedPosition: any;
    private infoWindow: any = new google.maps.InfoWindow();
    private draggable: boolean;
    private msgs: Message[] = [];
    private mapVisible : boolean = true;
    private adresse : string;

    //calendar
    private fr :any;

     //montant
    private checked :Boolean = false;

     //liste participants
    private friends : SelectItem[] = [];
    private friendsTemp : User[] = [];
    private selectedFriendsByID: string[] = [];

    //TOAST
    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;

    constructor(private authentificationService : AuthentificationService, private router: Router, private eventService : EventService){
        this.loadListeEventParticiped();
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
        setTimeout(()=> {
            this.participationVisible = false;
        }, 200);
        

        this.initializeCalendar();
    }

    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }

    showParticipation(event : Event){
       
        this.getEvent(event);
        this.participationVisible = true;
    }

    hideParticipation(){
        this.participationVisible = false;
    }

    getEvent(event : Event){
        this.event = event;
        this.eventService.getProducts(event.idEvenement).then(result => {
            this.event.productsRequired = result;
        })
        .catch(

        );

        //ajout invités existants
        this.eventService.getUsersConfirmed(event.idEvenement).then(result => {
            this.event.participants = result;

            for(let user of result){
                if(user)
                this.overlays.push(new google.maps.Marker({
                    position:{lat: Number(user.latitude), lng: Number(user.longitude) },
                    title:'Adresse de ' + user.prenom + ' ' + user.nom
                }));
            }
        })
        .catch(

        );

        if(this.event.prix != null){
            this.checked = true;
        }

        this.event.dateFin = this.event.dateFin.substring(0,16);
        this.event.dateDebut = this.event.dateDebut.substring(0,16);

        if(this.event.longitude != "" && this.event.latitude != ""){
            this.overlays.push(new google.maps.Marker({
                position:{lat: Number(this.event.latitude), lng: Number(this.event.longitude) },
                title:'Lieu de l\'évènement : ' + this.event.libelle
            }));
         }
    }

    handleOverlayClick(event) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});
    }
    else {
      this.msgs.push({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }
    
   /***********************
   *
   *  Calendar
   *
   * ********************/
  initializeCalendar(){
    this.fr = {
      firstDayOfWeek: 0,
      dayNames: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
      dayNamesShort: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      dayNamesMin: ["Lu","Ma","Me","Je","Ve","Sa","Di"],
      monthNames: [ "Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Avr", "Mai", "Jun","Jul", "Aou", "Sep", "Oct", "Nov", "Dec" ]
    };
  }
}
