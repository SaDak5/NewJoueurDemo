import { Equipe } from "./equipe.model";
import { Image } from "./image.model";
export class Joueur {
    numJoueur! : number;
    nomJoueur! : string;
    postJoueur! : string;
     dateNaissance! : Date ;
     equipe!:Equipe;
     image! : Image;
    imageStr!:string;
    images!: Image[];
    
    }