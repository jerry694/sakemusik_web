import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChansonsService } from 'src/app/chansons.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {
  chanssonsArray:any=[]
  isResultLoaded = false;
  currentPage: number = 1;
  currentChansonID = "";
  titreChanson: any;
  nomArtiste: any;
  nomsaArtistescCollaborateurs: any;
  pochetteAlbum: any;
  chansonUrl: any;
  lyrics: any;
  prix: any;
  isUpdateFormActive = false;
  chanson!: FormGroup;

  constructor( private chansonService: ChansonsService,private route:Router) {  }
  
  ngOnInit(): void {
    this.getAllChansons();
  }

  getAllChansons() {
    this.chansonService.getListOfSongs(this.currentPage)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        this.chanssonsArray = resultData.data;
        this.chanssonsArray.forEach((chanson:any) => {
          chanson.nomsaArtistescCollaborateurs = Array.isArray(chanson.nomsaArtistescCollaborateurs)
            ? chanson.nomsaArtistescCollaborateurs
            : [chanson.nomsaArtistescCollaborateurs];
        });
      });
  }
  setUpdate(data: any) {
    this.currentChansonID = data.id;
    this.chanson.patchValue({
      titreChanson: data.titreChanson,
      nomArtiste: data.nomArtiste,
      nomsaArtistescCollaborateurs: data.nomsaArtistescCollaborateurs.join('\n'),
      // pochetteAlbum: data.pochetteAlbum,
      // chansonUrl: data.chansonUrl,
      lyrics: data.lyrics,
      prix: data.prix
    });
    // Activer le formulaire de mise à jour
    this.isUpdateFormActive = true;
    console.log(this.titreChanson)
    console.log(this.nomArtiste)
    console.log(this.nomsaArtistescCollaborateurs)
    console.log(this.pochetteAlbum)
    console.log(this.chansonUrl)
    console.log(this.lyrics)
    console.log(this.prix)
    console.log(this.currentChansonID)

  }

  setDelete(data: any) {
    this.chansonService.deleteSong(data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deletedddd")
      this.getAllChansons();
    });
  }

}
