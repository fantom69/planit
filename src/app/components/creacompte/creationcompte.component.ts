import {Component, OnInit}                                              from '@angular/core';
import { AuthentificationService }                              from '../../services/authentification.service';
import { EventService } from '../../services/event.service';
import {Message, ChartModule, UIChart, SelectItem, CheckboxModule, CalendarModule, InputTextareaModule, InputSwitchModule,
  GMapModule, OverlayPanelModule, OverlayPanel, SelectButtonModule, SharedModule, DialogModule, ConfirmationService, ConfirmDialogModule, DataTableModule,  DropdownModule, MultiSelectModule} from 'primeng/primeng';
import { FormGroup, FormBuilder, FormControl, Validators }      from '@angular/forms';
import { Router}                                                from '@angular/router';
import { User }                                                 from '../../class/user.class';

declare var google: any;

@Component({
  selector: 'planit-creacompte',
  template: require('./creationcompte.html')
})

export class CreationCompteComponent implements OnInit  {

  private user : User;
  private passwordVerif : string;

  //MAP API
  //Position par defaut
  private options: any = {
    center: {lat: 46.98887141245888, lng: 3.15582275390625},
    zoom: 10
  };
  private map: any;
  private overlays: any[] = [];
  private selectedPosition: any;
  private infoWindow: any = new google.maps.InfoWindow();
  private msgs: Message[] = [];
  private mapVisible : boolean = true;
  private adresse : string;
  private messageConfirm : string = "";
  private showConfirm : Boolean = false;

  private msgToast: Message[] = [];
  private durationToast: String;
  private colorToast: String;

  constructor(private router: Router, private authentificationService : AuthentificationService, private eventService : EventService){

  }

  ngOnInit(){ //Verification utilisateur déjà dans le contexte
    this.user = new User();

    setTimeout(()=> {
      this.mapVisible = false;
    }, 200);

  }

  /********************
   *
   * CReation compte
   *
   *******************/
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
        this.messageConfirm = 'Voulez-vous définir le ' + res +' comme adresse de résidence ? ';
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
    this.user.latitude = this.selectedPosition.lat();
    this.user.longitude = this.selectedPosition.lng();
    this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:'Lieu de l\'évènement'}));
    this.user.lieu = this.adresse;
    this.showConfirm = false;
  }

  reject(){
    this.showConfirm = false;
  }

  removegeographical(){
    this.overlays = [];
    this.user.latitude = "";
    this.user.longitude = "";
  }

  showToastr(duration : string, severity : string, summary : string, detail : string) {
        this.msgToast = [];
        this.durationToast = duration;
        this.colorToast = severity;
        this.msgToast.push({severity: severity, summary:summary, detail:detail});
    }
}
