export class Event {

  idEvenement: number = null;
  libelle: string = null;
  description: string = null;
  dateDebut: string = null;
  dateCreation: string = null;
  lieu: string= null;
  idCreateur : number =null;
  statut : string = null;

  constructor(){ 

  }

  constructEventOrganized(pIdEvenement: number, pLibelle:string, pDescription:string, pDateDebut: string, pDateCreation : string, pLieu : string, pIdCreateur: number ){
    this.idEvenement = pIdEvenement;
    this.libelle = pLibelle;
    this.description = pDescription;
    this.dateDebut = pDateDebut;
    this.dateCreation = pDateCreation;
    this.lieu = pLieu;
    this.idCreateur = pIdCreateur;
  }

  constructEventParticiped(pIdEvenement: number, pLibelle:string, pDescription:string, pDateDebut: string, pDateCreation : string, pLieu : string, pIdCreateur: number, pStatut : string  ){
    this.idEvenement = pIdEvenement;
    this.libelle = pLibelle;
    this.description = pDescription;
    this.dateDebut = pDateDebut;
    this.dateCreation = pDateCreation;
    this.lieu = pLieu;
    this.idCreateur = pIdCreateur;
    this.statut =pStatut;
  }
}