import { Component,OnInit } from '@angular/core';
import { Joueur } from '../model/joueur.model';
import { JoueurService } from '../services/joueur.service';
import { Equipe } from '../model/equipe.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';


@Component({
  selector: 'app-add-joueur',
  templateUrl: './add-joueur.component.html',

})
export class AddJoueurComponent implements OnInit{

newJoueur = new Joueur();
equipes! : Equipe[];
newIdEq! : number;
newEquipe! : Equipe;
uploadedImage!: File;
imagePath: any;

constructor(private joueurService: JoueurService,private router :Router){}
ngOnInit(): void {
  this.joueurService.listeEquipes().subscribe(cats => {
    this.equipes = cats._embedded.equipes;
console.log(cats);
}
);

  }
  
  
    /*addJoueur(){
    this.newJoueur.equipe = this.equipes.find(cat => cat.idEq == this.newIdEq)!;
    this.joueurService.ajouterJoueur(this.newJoueur)
    .subscribe(prod => {
    console.log(prod);
    this.router.navigate(['joueurs']);
    });
    }
    */
    
  addJoueur(){
  this.joueurService
  .uploadImage(this.uploadedImage, this.uploadedImage.name)
  .subscribe((img: Image) => {
  this.newJoueur.image=img;
  this.newJoueur.equipe = this.equipes.find(cat => cat.idEq
  == this.newIdEq)!;
  this.joueurService
  .ajouterJoueur(this.newJoueur)
  .subscribe(() => {
  this.router.navigate(['joueurs']);
    });
    });
    }
    
  onImageUpload(event: any) {
      this.uploadedImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = (_event) => { this.imagePath = reader.result; }
      }
    
}
