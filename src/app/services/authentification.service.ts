import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Router}            from '@angular/router';
import { User }             from '../class/user.class';
import { AppConstants }     from '../app.constants';

@Injectable()
export class AuthentificationService {

     private headers = new Headers({'Content-Type': 'application/json'});
     public user: User = undefined;

    constructor(private http: Http, private router: Router){

    }

    /*
    *   LOGIN
    */
    login(user : User){
        return this.http.post(AppConstants.getApiURL()+'/userRestService/login.php', user, {headers: new Headers({'Content-Type': 'application/json'})})
        .toPromise()
        .then(loginOK => { //retourne true si creation ok ou false si un autre compte existe avec ce mail
            return loginOK.json();
        })
        .catch(
        );
        
    }

    /*
    *   LOGOUT
    */
    logout(){
        this.user = undefined;  
        return this.http.post(AppConstants.getApiURL()+'/userRestService/logout.php','', {headers: new Headers({'Content-Type': 'application/json'})})
            .toPromise()
            .then(()=>{
                this.router.navigate([AppConstants.getUnauthorizedAccessURL()]);
            })
            .catch(function(error) {
                console.log("Erreur AuthentificationService.logout() : " + error);
            });
    }

    /*
    *   CREATIONCOMPTE
    */
    creationCompte(user : User){
        return this.http.post(AppConstants.getApiURL()+'/userRestService/createUser.php', user, {headers: new Headers({'Content-Type': 'application/json'})})
        .toPromise()
        .then(creationOK => { //retourne true si creation ok ou false si un autre compte existe avec ce mail
            return creationOK.json();
        })
        .catch(function(error) {
            console.log("Erreur AuthentificationService.creationCompte() : " + error);
        });
    }

    /*
    *   GETUSER
    */
    getUser(){           
        return this.http.get(AppConstants.getApiURL()+'/userRestService/getUser.php', {headers: new Headers({'Content-Type': 'application/json'})})
        .toPromise()
        .then(res => {
            let data = res.json();
            if(data !== null){
                this.user = new User();
                this.user.constructUser(data["idUtilisateur"], data["nom"], data["prenom"], data["mail"]);
                return this.user;
            }
            else{//utilisateur non trouvé
                return null;
            }
        }).catch(function(error) {
            console.log("Erreur AuthentificationService.getUser() : " + error);
            return null;
        });
    }

    //Recuperation du user connecté coté serveur sauf s'il existe deja dans this.user
    UnauthorizedAccess() {
        if(this.user == undefined){ //on n'a pas d'utilisateur enregistré 
            this.getUser().then(res => {
                this.redirectionIfUnauthorized();
            }).catch(error => {
                console.log("Erreur AuthentificationService.UnauthorizedAccess() : " + error);
            });     
        }
        else{ //recherche de ses droits
            this.redirectionIfUnauthorized();
        }
    }

    //Vérification qu'on a les droits pour accéder à cette route => sinon retour à la page de login pour se connecter avec un compte qui possède les droits
    private redirectionIfUnauthorized(){
        //if(check){
            if(this.user == null || this.user == undefined){
                this.router.navigate([AppConstants.getUnauthorizedAccessURL()]);
            }
       /* }
        else{
            if(this.user == null || this.user == undefined){
                this.router.navigate([AppConstants.getCreationCompteAccessURL()]);
            }
        }*/
    }
}