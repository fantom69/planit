import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthentificationService {

     private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: Http){

    }

    login(email : String, password : String){
        // this.http.post('/JerseyDemo/services/login', JSON.stringify({ "email": email, "password": password }), Headers)
        // .toPromise(
        // )
        // .catch(

        // );
        this.http.get('JerseyDemo/services/login', Headers)
        .toPromise()
        .then(user => {
            alert(user);
        })
        .catch(

        );
    }
}