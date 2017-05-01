import { Product } from './product.class';
import {User} from "./user.class";

export class Event {

  idEvenement: number = null;
  libelle: string = "";
  description: string = "";
  dateDebut: string = null;
  dateFin : string = null;
  dateCreation: string = null;
  lieu: string= "";
  latitude: string = "";
  longitude: string = "";
  idCreateur : number =null;
  statut : string = null;
  prix : number = null;

  productsRequired : Product[] = [];

  participants : User[] = [];


  constructor(){

  }

  constructEventOrganized(pIdEvenement: number, pLibelle:string, pDescription:string, pDateDebut: string, pDateFin : string, pDateCreation : string, pLieu : string, pLatitude : string, pLongitude : string, pPrix : number, pIdCreateur: number ){
    this.idEvenement = pIdEvenement;
    this.libelle = pLibelle;
    this.description = pDescription;
    this.dateDebut = pDateDebut;
    this.dateFin = pDateFin;
    this.dateCreation = pDateCreation;
    this.lieu = pLieu;
    this.latitude = pLatitude;
    this.longitude = pLongitude;
    this.prix = pPrix;
    this.idCreateur = pIdCreateur;
  }

  constructEventParticiped(pIdEvenement: number, pLibelle:string, pDescription:string, pDateDebut: string,  pDateFin : string, pDateCreation : string, pLieu : string, pLatitude : string, pLongitude : string, pPrix : number, pIdCreateur: number, pStatut : string  ){
    this.idEvenement = pIdEvenement;
    this.libelle = pLibelle;
    this.description = pDescription;
    this.dateDebut = pDateDebut;
    this.dateFin = pDateFin;
    this.dateCreation = pDateCreation;
    this.lieu = pLieu;
    this.latitude = pLatitude;
    this.longitude = pLongitude;
    this.prix = pPrix;
    this.idCreateur = pIdCreateur;
    this.statut =pStatut;
  }

  valid(prixChecked : Boolean){
    if(this.libelle.length < 5 || this.description.length < 10 || this.dateDebut == null || this.dateFin == null || this.lieu.length < 5 || (prixChecked == true && this.prix == null)){
      return false;
    }
    else{
      return true;
    }
  }
}
