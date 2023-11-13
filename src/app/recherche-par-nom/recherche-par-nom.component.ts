import { Component ,OnInit} from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../services/joueur.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
 
})
export class RechercheParNomComponent {
  nomJoueur!:string;
  joueurs!:Joueur[];
 allJoueurs!:Joueur[];
searchTerm!: string;
constructor(private joueurService :JoueurService){

}
ngOnInit():void{
this.joueurService.listeJoueur().subscribe(prods =>{
  console.log(prods);
  this.joueurs=prods;
});
}
rechercherJrs(){
  this.joueurService.rechercherParNom(this.nomJoueur).
  subscribe(prods => {
  this.joueurs = prods;
  console.log(prods)});
  }

onKeyUp(filterText : string){
    this.joueurs = this.allJoueurs.filter(item =>
    item.nomJoueur.toLowerCase().includes(filterText));
}
}