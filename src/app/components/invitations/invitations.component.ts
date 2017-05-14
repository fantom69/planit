import {Component} from '@angular/core';
import { AuthentificationService } from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';
import { Event } from '../../class/event.class';
import { Product } from '../../class/product.class';
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
    private showModalParticipate  :Boolean = false;

     //liste participants
    private friends : SelectItem[] = [];
    private friendsTemp : User[] = [];
    private selectedFriendsByID: string[] = [];

    //Overlay
    private selectedEvent : Event = undefined;

    //TOAST
    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;


    /**
     * 
     * Constructeurs et ngOninit
     * 
     */
    constructor(private authentificationService : AuthentificationService, private router: Router, private eventService : EventService){
        this.loadListeEventParticiped();
    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess();
        setTimeout(()=> {
            this.participationVisible = false;
        }, 200);
        

        this.initializeCalendar();
    }


    showParticipation(event : Event){
        this.getEvent(event);
        this.participationVisible = true;
    }

    hideParticipation(){
        this.participationVisible = false;
    }

    decline(){
        this.eventService.declineInvitation(this.event.idEvenement).then(result => {
            if(result == true){
                this.hideParticipation();
                this.loadListeEventParticiped();
                this.router.navigate(['/invitations']);
            }
            else{
                this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue");
            }
        })
        .catch(

        );
    }

    participate(){
        let unvalid : boolean = false;
        for(let product of this.event.productsRequired){
            if(!product.validQuantity()){
                unvalid = true;
            }
        }

        if(unvalid){
             this.showToastr("5000", "warn", "Attention", "La quantité doit être un nombre entier");
        }
        else{      
            //MAJ de la liste des produits amenés
            this.eventService.updateProductsTaken(this.event)
            .then(result => {
                if(result == true){
                    this.loadListeEventParticiped();
                    this.router.navigate(['/invitations']);
                }
                else{
                    this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue");
                }
                })
            .catch(

            );

            this.eventService.participateInvitation(this.event.idEvenement).then(result => {
                if(result == true){
                    
                    this.hideParticipation();
                    this.loadListeEventParticiped();
                    this.router.navigate(['/invitations']);
                }
                else{
                    this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue");
                }
                this.showModalParticipate = false;
            })
            .catch(

            );
         }
    }


    

    /*****************
     * 
     * CHARGEMENTS DONNEES
     * 
     *****************/
    loadListeEventParticiped(){
        this.eventService.getAllEventsParticiped()
        .then(result => {
            this.eventsParticiped = result;
            for (let test of this.eventsParticiped){
                this.eventService.getProductsWithActualQuantity(test.idEvenement).then(result => {
                    test.productsRequired = result;
                })
                .catch(

                );
            }
        })
        .catch(
        );
    }

    getEvent(event : Event){
        this.event = event;
        this.eventService.getProductsWithActualQuantity(event.idEvenement).then(result => {
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
        

        this.event.dateFin = this.event.dateFin.substring(0,16);
        this.event.dateDebut = this.event.dateDebut.substring(0,16);

        if(this.event.longitude != "" && this.event.latitude != ""){
            this.overlays.push(new google.maps.Marker({
                position:{lat: Number(this.event.latitude), lng: Number(this.event.longitude) },
                title:'Lieu de l\'évènement : ' + this.event.libelle
            }));
         }
    }

    /*************************
     * 
     * MAPS
     * 
     ************************/
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

  /**
   * 
   * Overlay
   * 
   */
  showOverlayDetailsEvent(event, evenement : Event, overlaypanel: OverlayPanel) {
        this.selectedEvent = evenement;
        overlaypanel.toggle(event);
    }


  /*******************
   * 
   * TOASTR
   * 
   *******************/
    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
