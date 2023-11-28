import { Injectable } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { Equipe} from '../model/equipe.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EquipeWrapper } from '../model/equipeWrapped.model';
import { AuthService } from './auth.service';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
  

@Injectable({
providedIn: 'root'
})
export class JoueurService {
  
  apiURL: string = 'http://localhost:8081/joueurs/api'; 
  apiURLCat: string = 'http://localhost:8081/joueurs/cat';
  joueurs!: Joueur[]; //un tableau de Joueur
/*equipes :Equipe[];*/

constructor(private http : HttpClient,private authService :AuthService) {
  }

  



listeJoueur(): Observable<Joueur[]>{
  
      return this.http.get<Joueur[]>(this.apiURL+"/all");
  }
  
  ajouterJoueur( prod: Joueur):Observable<Joueur>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Joueur>(this.apiURL+"/addjou", prod, {headers:httpHeaders});
    }
    

    supprimerJoueur(id : number) {
      const url = `${this.apiURL}/deljou/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.delete(url, {headers:httpHeaders});
      }
      

      

  
      consulterJoueur(id: number): Observable<Joueur> {
        const url = `${this.apiURL}/getbyid/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<Joueur>(url,{headers:httpHeaders});
        }
        


updateJoueur(prod :Joueur) : Observable<any>
{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
  return this.http.put<Joueur>(this.apiURL+"/updatejou", prod, {headers:httpHeaders});
}

listeEquipes():Observable<EquipeWrapper>{
  let jwt = this.authService.getToken();
  jwt = "Bearer "+jwt;
  let httpHeaders = new HttpHeaders({"Authorization":jwt})
   return this.http.get<EquipeWrapper>(this.apiURLCat,{headers:httpHeaders});
  }
  
  
    
  

/* trierJoueurs(){
  this.joueurs = this.joueurs.sort((n1,n2) => {
  if (n1.numJoueur! > n2.numJoueur!) {
  return 1;
  }
  if (n1.numJoueur! < n2.numJoueur!) {
  return -1;
  }
  return 0;
  });
  }
  

consulterEquipe(id:number): Equipe{
    return this.equipes.find(cat => cat.idEq == id)!;
    } */


  rechercherParEquipe(idEq: number): Observable<Joueur[]> {
    const url = `${this.apiURL}/jrseq/${idEq}`;
        return this.http.get<Joueur[]>(url);
  }
      

  rechercherParNom(nom: string):Observable< Joueur[]> {
    const url = `${this.apiURL}/jrsByName/${nom}`;
    return this.http.get<Joueur[]>(url);
    }
    ajouterEquipe( cat: Equipe):Observable<Equipe>{
      return this.http.post<Equipe>(this.apiURLCat, cat, httpOptions);
      }
      
    
}