import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Router}            from '@angular/router';
import { Event }             from '../class/event.class';
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
                        event.constructEventOrganized(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateCreation, data[i].lieu, data[i].idUtilisateur);
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
                        event.constructEventParticiped(data[i].idEvenement, data[i].libelle, data[i].description, data[i].dateDebut, data[i].dateCreation, data[i].lieu, data[i].idUtilisateur, data[i].statut);
                        listEvent.push(event);
                    }
                }
                return listEvent;
            })
        .catch(function(error) {
            console.log("Erreur eventService.getAllEventsParticiped() : " + error);
        });
    }
}