export class Product {

  idProduit: number = null;
  libelleProduit: string = "";
  uniteProduit: number = 1;
  actualQuantity : number = 0;
  quantityTaken : number = 0;
  idEvenement: number = null;


  constructor(){

  }

  constructProduct(pIdProduit: number, pLibelle:string, pUnite:number, pIdEvent: number ){
    this.idProduit = pIdProduit;
    this.libelleProduit = pLibelle;
    this.uniteProduit = pUnite;
    this.idEvenement = pIdEvent;
  }

  constructProductWithActualQuantity(pIdProduit: number, pLibelle:string, pUnite:number, pActualQuantity : number, pIdEvent: number ){
    this.idProduit = pIdProduit;
    this.libelleProduit = pLibelle;
    this.uniteProduit = pUnite;
    this.actualQuantity = pActualQuantity;
    this.idEvenement = pIdEvent;
  }

  valid(){
    if(this.libelleProduit.length < 2 ){
      return false;
    }
    else{
      if(this.uniteProduit == 0 || this.uniteProduit == null)
        this.uniteProduit = 1
      return true;
    }
  }

  validQuantity(){
    if(!isNaN(this.quantityTaken)){
      return true;
    }
    else {
      return false;
    }
  }
}
