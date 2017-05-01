export class Product {

  idProduit: number = null;
  libelleProduit: string = "";
  uniteProduit: string = "";
  idEvenement: number = null;


  constructor(){

  }

  constructProduct(pIdProduit: number, pLibelle:string, pUnite:string, pIdEvent: number ){
    this.idProduit = pIdProduit;
    this.libelleProduit = pLibelle;
    this.uniteProduit = pUnite;
    this.idEvenement = pIdEvent;
  }


  valid(){
    if(this.libelleProduit.length < 2 ){
      return false;
    }
    else{
      return true;
    }
  }
}
