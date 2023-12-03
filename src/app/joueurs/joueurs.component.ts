import { Component, OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../services/joueur.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html'
 
})
export class JoueursComponent implements OnInit{
  joueurs? : Joueur[]; //un tableau de chînes de caractères
   
  constructor(private joueurService : JoueurService,
public authService: AuthService){

    //this.joueurs = this.joueurService.listeJoueur();
    }
  ngOnInit(): void {
    
    this.chargerJoueurs();
    

  }
  chargerJoueurs(){
    this.joueurService.listeJoueur().subscribe(prods => {
    
    this.joueurs = prods;
    console.log(prods);

    this.joueurs.forEach((prod) => {
      this.joueurService
      .loadImage(prod.image.idImage)
      .subscribe((img: Image) => {
      prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
      });
      });
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