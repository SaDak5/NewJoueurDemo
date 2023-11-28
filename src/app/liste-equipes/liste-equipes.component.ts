import { Component ,OnInit} from '@angular/core';
import { JoueurService } from '../services/joueur.service';
import { Equipe } from '../model/equipe.model';

@Component({
  selector: 'app-liste-equipes',
  templateUrl: './liste-equipes.component.html',
  
})
export class ListeEquipesComponent implements OnInit{

  equipes! : Equipe[];
  ajout:boolean=true;

updatedEqp: Equipe = {"idEq":0,"nomEqp":"","nomStade":"","anneeCreation":0};


constructor(private joueurService : JoueurService){}

ngOnInit(){
  this.chargerEquipes();
};


chargerEquipes(){
  this.joueurService.listeEquipes().
  subscribe(cats => {this.equipes = cats._embedded.equipes;
  console.log(cats);
  });
  }
equipeUpdated(cat:Equipe){
  console.log("equipes updated event",cat);
  this.joueurService.ajouterEquipe(cat).
   subscribe( ()=> this.chargerEquipes());
  }
  
  updateEq(cat:Equipe) {
    this.updatedEqp=cat;
    this.ajout=false; 
    }
    
}
