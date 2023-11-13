import { Component,OnInit } from '@angular/core';
import { ActivatedRoute,Router} from '@angular/router';
import { JoueurService } from '../services/joueur.service';
import { Joueur } from '../model/joueur.model';
import { Equipe } from '../model/equipe.model';
@Component({
  selector: 'app-update-joueur',
  templateUrl: './update-joueur.component.html'
  
})
export class UpdateJoueurComponent implements OnInit {

currentJoueur = new Joueur();
equipes! : Equipe[];
updatedCatEq! : number;

constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
  private joueurService: JoueurService){}

ngOnInit(): void {

  this.joueurService.listeEquipes().
  subscribe(cats => {console.log(cats);
  this.equipes = cats._embedded.equipes;
  }
  );
  this.joueurService.consulterJoueur(this.activatedRoute.snapshot.params['id']).
  subscribe( prod =>{ this.currentJoueur = prod;
  this.updatedCatEq = this.currentJoueur.equipe.idEq;
  } ) ;
  
  }


  updateJoueur(){
    this.currentJoueur.equipe = this.equipes.
 find((cat) => cat.idEq == this.updatedCatEq)!;
  this.joueurService.updateJoueur(this.currentJoueur).subscribe((prod)=> {this.router.navigate(['joueurs']); });
    

}
}