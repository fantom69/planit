import {Component, } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, CalendarModule, InputTextareaModule, InputSwitchModule,
GMapModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../class/user.class';
import { Event } from '../../class/event.class';
import { Product } from '../../class/product.class';

declare var google: any;

@Component({
  selector: 'planit-event',
  template: require('./event.html')
})
export class EventComponent {


    private newEvent = true;

    //Toast
    private msgToast: Message[] = [];
    private durationToast: String;
    private colorToast: String;

    //Evenement
    private event : Event;

    //Product
    private lastRowOfProduct : Product = new Product();
   // private listProduct : Product[] = [];

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
    private messageConfirm : string = "";
    private showConfirm : Boolean = false;

    //calendar
    private fr :any;

    //montant
    private checked :Boolean = false;

    //liste items

    constructor(private router: Router, private authentificationService : AuthentificationService, private eventService : EventService, private activatedRoute: ActivatedRoute, private confirmationService: ConfirmationService){

    }

    ngOnInit(){ //Verification utilisateur déjà dans le contexte
        this.authentificationService.UnauthorizedAccess();
        this.event = new Event();
        if(this.activatedRoute.snapshot.params['id'] > 0){
             this.newEvent = false;
             this.getEvent(this.activatedRoute.snapshot.params['id']);
        }
        else{
           /* this.options = {
                center: {lat: 46.98887141245888, lng: 3.15582275390625},
                zoom: 10
            };*/
        }

        setTimeout(()=> {
            this.mapVisible = false;
        }, 200);

        this.initializeCalendar();


    }



    /*********************
 *
 *    Google Maps
 *
 * ******************/
showMap(){
  this.mapVisible = true;
}

  saveMap(){
    this.mapVisible = false;
  }


  handleMapClick(event) {

    this.selectedPosition = event.latLng;

    this.eventService.getAdressFromLatLng(this.selectedPosition.lat(), this.selectedPosition.lng())
      .then(res =>{
        this.adresse = res;
        this.messageConfirm = 'Voulez-vous définir le ' + res +' comme lieu de l\'évènement ? ';
        this.showConfirm = true;
      });
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

  accept(){
    this.overlays = [];
    this.event.latitude = this.selectedPosition.lat();
    this.event.longitude = this.selectedPosition.lng();
    this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:'Lieu de l\'évènement'}));
    this.event.lieu = this.adresse;
    this.showConfirm = false;
  }

  reject(){
    this.showConfirm = false;
  }

  removegeographical(){
    this.overlays = [];
    this.event.latitude = "";
    this.event.longitude = "";
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

  /***********************
   *
   *  Get event
   *
   * ********************/
  getEvent(idEvent : number){
    this.eventService.getEvent(idEvent)
      .then(result => {
        if(result == null){
          this.router.navigate(['/event']);
        }
        else{
          this.event = result;
          this.eventService.getProducts(idEvent).then(result => {
            this.event.productsRequired = result;
          })
            .catch(

            );


          if(this.event.prix != null){
            this.checked = true;
          }

          this.event.dateFin = this.event.dateFin.substring(0,16);
          this.event.dateDebut = this.event.dateDebut.substring(0,16);



          if(this.event.longitude != "" && this.event.latitude != ""){
            /* this.options = {
             center: {lat: 48.856402792866774, lng: 2.34832763671875},
             zoom: 10
             };*/

            // String text =
            //var myLatLng = {lat: Math.round(this.event.latitude), lng: Math.round(this.event.longitude)};
            this.overlays.push(new google.maps.Marker({
              position:{lat: Number(this.event.latitude), lng: Number(this.event.longitude) },
              title:'Lieu de l\'évènement ' + this.event.libelle
            }));

            // this.overlays.push(new google.maps.Marker({position:{lat: 48.856402792866774, lng: 2.34832763671875}, title:'Lieu de l\'évènement'}));
          }
        }
      })
      .catch(

      );
  }

    /***********************
     *
     *  Ajout event
     *
     * ********************/
      addEvent(){
          if(!this.event.valid(this.checked)){
              this.showToastr("5000", "warn", "Attention", "Certains champs sont incomplets");
          }
          else{
              //ajout du dernier item à la liste
              if(this.lastRowOfProduct.valid()) {
                this.event.productsRequired.push(this.lastRowOfProduct);
                this.lastRowOfProduct = new Product();
              }

              //Suppression des items avec un libelle non valide
              for(let produit of this.event.productsRequired){
                if(!produit.valid()) {
                  this.removeItem(produit);
                }
              }
              this.eventService.addEvent(this.event)
              .then(result => {
                  if(result == true){
                      this.router.navigate(['/home']);
                  }
                  else{
                      this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue");
                  }
              })
              .catch(

              );
          }
      }



    /*************************
     *
     * UpdateEvent
     *
     ************************/
      updateEvent(){
        if(!this.event.valid(this.checked)){
          this.showToastr("5000", "warn", "Attention", "Certains champs sont incomplets");
        }
        else {
          //ajout du dernier item à la liste
          if(this.lastRowOfProduct.valid()) {
            this.event.productsRequired.push(this.lastRowOfProduct);
            this.lastRowOfProduct = new Product();
          }

          //SUppression des items avec un libelle non valide
          for (let produit of this.event.productsRequired) {
            if (!produit.valid()) {
              this.removeItem(produit);
            }
          }
          this.eventService.updateEvent(this.event)
            .then(result => {
              if (result == true) {
                this.router.navigate(['/home']);
              }
              else {
                this.showToastr("5000", "warn", "Attention", "Une erreur est intervenue");
              }
            })
            .catch(

            );
        }
      }

    /*********************** Gestion des items *******/
    addItem(){
      if(this.lastRowOfProduct.valid()) {
        this.event.productsRequired.push(this.lastRowOfProduct);
        this.lastRowOfProduct = new Product();
      }
      else{
        this.showToastr("5000", "warn", "Attention", "Veuillez saisir un nom de produit valide");
      }
    }

    removeItem(productToRemove : Product){
      var index = this.event.productsRequired.indexOf(productToRemove);
      this.event.productsRequired.splice(index, 1);
    }

    /*********************** Toast  ****************/
    showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}


// get adresse from lat and long : http://maps.googleapis.com/maps/api/geocode/json?latlng=47.000706692176756,3.1454212311655283&sensor=true
