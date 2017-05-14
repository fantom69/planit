import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Router}            from '@angular/router';
import { Event }            from '../class/event.class';
import { Product }          from '../class/product.class';
import { AppConstants }     from '../app.constants';
import {User} from "../class/user.class";

@Injectable()
export class EventService {

     private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private router: Router){

    }

    getAllEventsEdited(){
        let listEvent: Event[] = [];
        return this.http.get(AppConstants.getApiURL()+'/eventRestService/getEventsEdited.php', {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                let data = res.json();

                if(data !== null){
                    for(let i = 0; i<data.length; i++ ){
                        let event : Event = new Event();
                        event.constructEventOrganized(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateFin, data[i].dateCreation, data[i].lieu, data[i].latitude, data[i].longitude, data[i].prix, data[i].idUtilisateur, data[i].statut);
                        listEvent.push(event);
                    }
                }
                return listEvent;
            })
        .catch(function(error) {
            console.log("Erreur eventService.getAllEventsOrganized() : " + error);
        });
    }



    getAllEventsPublished(){
      let listEvent: Event[] = [];
      return this.http.get(AppConstants.getApiURL()+'/eventRestService/getEventsPublished.php', {headers: new Headers({'Content-Type': 'application/json'})})
        .toPromise()
        .then(res =>{
          let data = res.json();

          if(data !== null){
            for(let i = 0; i<data.length; i++ ){
              let event : Event = new Event();
              event.constructEventOrganized(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateFin, data[i].dateCreation, data[i].lieu, data[i].latitude, data[i].longitude, data[i].prix, data[i].idUtilisateur, data[i].statut);
              listEvent.push(event);
            }
          }
          return listEvent;
        })
        .catch(function(error) {
          console.log("Erreur eventService.getAllEventsOrganized() : " + error);
        });
    }

    getAllEventsParticiped(){
        let listEvent: Event[] = [];
        return this.http.get(AppConstants.getApiURL()+'/eventRestService/getEventsParticiped.php', {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                let data = res.json();

                if(data !== null){
                    for(let i = 0; i<data.length; i++ ){
                        let event : Event = new Event();
                        event.constructEventParticiped(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateFin, data[i].dateCreation, data[i].lieu, data[i].latitude, data[i].longitude, data[i].prix, data[i].idUtilisateur, data[i].statut);
                        if(event.statut == "participation"){
                            event.statut = "Vous participez"
                        }
                        else if(event.statut == "refus"){
                            event.statut = "Vous avez refusé l'invitation"
                        }
                        else{
                            event.statut = "Vous n'avez pas encore donné de réponse !!"
                        }
                        listEvent.push(event);
                    }
                }
                return listEvent;
            })
        .catch(function(error) {
            console.log("Erreur eventService.getAllEventsParticiped() : " + error);
        });
    }

    getAdressFromLatLng(lat : string, lng: string){

        let object = {
            lat : lat,
            lng : lng
        }
        return this.http.post(AppConstants.getApiURL()+'/eventRestService/getAddressFromLatLng.php', object , {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                let data = res.json();

                return data.results['0'].formatted_address;
            })
        .catch(function(error) {
            console.log("Erreur eventService.getAdressFromLatLng() : " + error);
        });
    }

    addEvent(event : Event){
        //conversion en string
        event.latitude = ""+event.latitude;
        event.longitude = ""+event.longitude;
        return this.http.post(AppConstants.getApiURL()+'/eventRestService/createEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                return res.json();
            })
        .catch(function(error) {
            console.log("Erreur eventService.addEvent() : " + error);
        });
    }

    getEvent(idEvenement : number){
        let event= {
            idEvenement : idEvenement
        }

        return this.http.post(AppConstants.getApiURL()+'/eventRestService/getEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                let data = res.json();
                if(data == false){
                    return null;
                }
                else {
                  let event : Event = new Event();
                  event.constructEventOrganized(data.idEvenement, data.libelle, data.description, data.dateDebut, data.dateFin, data.dateCreation, data.lieu, data.latitude, data.longitude, data.prix, data.idUtilisateur, data.statut);
                  return event
                }
            })
        .catch(function(error) {
            console.log("Erreur eventService.getEvent() : " + error);
        });
    }

    reediteEvent(event : Event){
        return this.http.post(AppConstants.getApiURL()+'/eventRestService/reediteEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                return res.json();
            })
        .catch(function(error) {
            console.log("Erreur eventService.reediteEvent() : " + error);
        });
    }


    updateEvent(event : Event){
        return this.http.post(AppConstants.getApiURL()+'/eventRestService/updateEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                return res.json();
            })
        .catch(function(error) {
            console.log("Erreur eventService.updateEvent() : " + error);
        });
    }

  confirmEvent(event : Event){
    return this.http.post(AppConstants.getApiURL()+'/eventRestService/confirmEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res =>{
        return res.json();
      })
      .catch(function(error) {
        console.log("Erreur eventService.confirmEvent() : " + error);
      });
  }

    removeEvent(event : Event){
        return this.http.post(AppConstants.getApiURL()+'/eventRestService/deleteEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                return res.json();
            })
        .catch(function(error) {
            console.log("Erreur eventService.removeEvent() : " + error);
        });
    }

  /***************
   * Gestion des produits
   ***************/

  //retourne la liste des produits associé à un evenement
  getProducts(idEvenement : number){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/getProducts.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        let dataProducts = res.json();
        let products: Product[] = [];
        for (let i = 0; i < dataProducts.length; i++) {
          let product = new Product();
          product.constructProduct(dataProducts[i].idProduit, dataProducts[i].libelleProduit, dataProducts[i].uniteProduit, dataProducts[i].idEvenement);
          products.push(product);
        }
        return products;
      })
      .catch(function (error) {
        console.log("Erreur eventService.getProducts() : " + error);
      });
  }

  getProductsWithActualQuantity(idEvenement : number){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/getProductsWithActualQuantity.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        let dataProducts = res.json();
        let products: Product[] = [];
        for (let i = 0; i < dataProducts.length; i++) {
          let product = new Product();
          product.constructProductWithActualQuantity(dataProducts[i].idProduit, dataProducts[i].libelleProduit, dataProducts[i].uniteProduit, dataProducts[i].quantityActual, dataProducts[i].idEvenement);
          products.push(product);
        }

        this.http.post(AppConstants.getApiURL() + '/eventRestService/getQuantityTaken.php', "toto", {headers: new Headers({'Content-Type': 'application/json'})})
        .toPromise()
        .then(resp => {
            let data = resp.json();
            //parcours de tous les items
            for (let i = 0; i < products.length; i++) {
                let founded : Boolean = false;
                for(let ii=0; ii< data.length; ii++){
                    if(products[i].idProduit == data[ii].idProduit){
                        products[i].quantityTaken = data[ii].quantityTaken;
                        founded = true;
                        break;
                    }

                    
                }
                if(!founded){
                    products[i].quantityTaken = 0;
                }
            }
            
        })
        .catch(function (error) {
            console.log("Erreur eventService.getQuantityTaken() : " + error);
        });

        return products;
      })
      .catch(function (error) {
        console.log("Erreur eventService.getProductsWithActualQuantity() : " + error);
      });
  }

  updateProductsTaken(event : Event){
      return this.http.post(AppConstants.getApiURL()+'/eventRestService/updateProductsTaken.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                return res.json();
            })
        .catch(function(error) {
            console.log("Erreur eventService.updateProductsTaken() : " + error);
        });
  }

  /***************
   * Gestion des amis
   **************/

  getAllFriends(){
    return this.http.get(AppConstants.getApiURL() + '/userRestService/getAllFriends.php', {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        let data= res.json();
        let users: User[] = [];
        for (let i = 0; i < data.length; i++) {
          let user = new User();
          user.constructUser(data[i].idUtilisateur, data[i].nom, data[i].prenom, data[i].mail, data[i].lieu, data[i].latitude, data[i].longitude);
          users.push(user);
        }
        return users;
      })
      .catch(function (error) {
        console.log("Erreur eventService.getAllFriends() : " + error);
      });
  }

  getUsersInvited(idEvenement){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/getUsersInvited.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        let data= res.json();
        let users: User[] = [];
        for (let i = 0; i < data.length; i++) {
          let user = new User();
          user.constructUser(data[i].idUtilisateur, data[i].nom, data[i].prenom, data[i].mail, data[i].lieu, data[i].latitude, data[i].longitude);
          users.push(user);
        }
        return users;
      })
      .catch(function (error) {
        console.log("Erreur eventService.getAllFriends() : " + error);
      });
  }

  getUsersConfirmed(idEvenement){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/getUsersConfirmed.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        let data= res.json();
        let users: User[] = [];
        for (let i = 0; i < data.length; i++) {
          let user = new User();
          user.constructUser(data[i].idUtilisateur, data[i].nom, data[i].prenom, data[i].mail, data[i].lieu, data[i].latitude, data[i].longitude);
          users.push(user);
        }
        return users;
      })
      .catch(function (error) {
        console.log("Erreur eventService.getAllFriends() : " + error);
      });
  }

  declineInvitation(idEvenement){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/declineEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(function (error) {
        console.log("Erreur eventService.getAllFriends() : " + error);
      });
  }

  participateInvitation(idEvenement){
    let event= {
      idEvenement : idEvenement
    }
    return this.http.post(AppConstants.getApiURL() + '/eventRestService/participateEvent.php', event, {headers: new Headers({'Content-Type': 'application/json'})})
      .toPromise()
      .then(res => {
        return res.json();
      })
      .catch(function (error) {
        console.log("Erreur eventService.getAllFriends() : " + error);
      });
  }

}
