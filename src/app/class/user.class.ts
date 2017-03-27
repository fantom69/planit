export class User {

  idUtilisateur: number = null;
  mail: string = null;
  nom: string = null;
  prenom: string = null;
  password: string = null;

  constructor(){ 

  }

  constructUser(pId: number, pName:string, pFirstName:string, pMail: string){
    this.idUtilisateur = pId;
    this.nom = pName;
    this.prenom = pFirstName;
    this.mail = pMail;
  }

  createUser(pName:string, pFirstName:string, pMail: string, pPassword : string){
    this.nom = pName;
    this.prenom = pFirstName;
    this.mail = pMail;
    this.password = pPassword;
  }
}