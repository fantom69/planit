import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Router}            from '@angular/router';
import { Event }            from '../class/event.class';
import { Product }          from '../class/product.class';
import { AppConstants }     from '../app.constants';

@Injectable()
export class EventService {

     private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http, private router: Router){

    }

    getAllEventsOrganized(){
        let listEvent: Event[] = [];
        return this.http.get(AppConstants.getApiURL()+'/eventRestService/getEventsOrganized.php', {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(res =>{
                let data = res.json();

                if(data !== null){
                    for(let i = 0; i<data.length; i++ ){
                        let event : Event = new Event();
                        event.constructEventOrganized(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateFin, data[i].dateCreation, data[i].lieu, data[i].latitude, data[i].longitude, data[i].prix, data[i].idUtilisateur);
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
                  event.constructEventOrganized(data.idEvenement, data.libelle, data.description, data.dateDebut, data.dateFin, data.dateCreation, data.lieu, data.latitude, data.longitude, data.prix, data.idUtilisateur);
                  return event
                }
            })
        .catch(function(error) {
            console.log("Erreur eventService.getEvent() : " + error);
        });
    }

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
}
