export class User {

  idUtilisateur: number = null;
  mail: string = null;
  nom: string = null;
  prenom: string = null;
  password: string = null;
  lieu : string = "";
  latitude: string = "";
  longitude: string = "";

  constructor(){

  }

  constructUser(pId: number, pName:string, pFirstName:string, pMail: string, pLieu : string, pLatitude : string, pLongitude : string ){
    this.idUtilisateur = pId;
    this.nom = pName;
    this.prenom = pFirstName;
    this.mail = pMail;
    this.lieu = pLieu;
    this.latitude = pLatitude;
    this.longitude = pLongitude;
  }

  createUser(pName:string, pFirstName:string, pMail: string, pPassword : string, pLieu : string, pLatitude : string, pLongitude : string){
    this.nom = pName;
    this.prenom = pFirstName;
    this.mail = pMail;
    this.password = pPassword;
    this.lieu = pLieu;
    this.latitude = pLatitude;
    this.longitude = pLongitude;
  }
}
