import { Injectable } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { Equipe} from '../model/equipe.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EquipeWrapper } from '../model/equipeWrapped.model';

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

constructor(private http : HttpClient) {
  }

  



listeJoueur(): Observable<Joueur[]>{
  return this.http.get<Joueur[]>(this.apiURL);
  }
  
  ajouterJoueur( prod: Joueur):Observable<Joueur>{
    return this.http.post<Joueur>(this.apiURL, prod, httpOptions);
    }
    

    supprimerJoueur(id : number) {
      const url = `${this.apiURL}/${id}`;
      console.log(url)
      return this.http.delete(url, httpOptions);
      }
      

      

  
      consulterJoueur(id: number): Observable<Joueur> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Joueur>(url);
        }
        


updateJoueur(prod :Joueur) : Observable<any>
{
return this.http.put<Joueur>(this.apiURL, prod, httpOptions);
}

listeEquipes():Observable<EquipeWrapper>{
  return this.http.get<EquipeWrapper>(this.apiURLCat);
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
    
}