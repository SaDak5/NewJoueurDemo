import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../services/joueur.service';


@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html'
 
})
export class JoueursComponent implements OnInit{
  joueurs? : Joueur[]; //un tableau de chînes de caractères
   
  constructor(private joueurService: JoueurService){

    //this.joueurs = this.joueurService.listeJoueur();
    }
  ngOnInit(): void {
    
    this.chargerJoueurs();
    

  }
  chargerJoueurs(){
    this.joueurService.listeJoueur().subscribe(prods => {
    
    this.joueurs = prods;
    console.log(prods);
    });
    }
    supprimerJoueur(p: Joueur)
    {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
    this.joueurService.supprimerJoueur(p.numJoueur).subscribe(() => {
    
    this.chargerJoueurs();
    console.log("joueur supprimé");
    });
    } 

}