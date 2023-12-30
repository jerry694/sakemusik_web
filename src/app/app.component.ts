import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChansonsService } from './chansons.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  chanssonsArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  stname: string = "";
  course: string = "";
  fee: string = "";
  chanson: FormGroup;

  currentChansonID = "";
  titreChanson: any;
  nomArtiste: any;
  nomsaArtistescCollaborateurs: any;
  pochetteAlbum: any;
  chansonUrl: any;
  lyrics: any;
  prix: any;




  currentPage: number = 1;

  constructor(private fb: FormBuilder, private chansonService: ChansonsService) {
    this.chanson = this.fb.group({
      titreChanson: ['', Validators.required],
      nomArtiste: ['', Validators.required],
      nomsaArtistescCollaborateurs: [''],
      pochetteAlbum: [''],
      chansonUrl: ['', Validators.required],
      lyrics: [''],
      prix: ['']
    });


  }

  ngOnInit(): void {
    this.getAllChansons();

  }

  onSubmit() {
    const formData = new FormData();

    const titreChansonControl = this.chanson.get('titreChanson');
    const nomArtisteControl = this.chanson.get('nomArtiste');
    const nomsaArtistescCollaborateursControl = this.chanson.get('nomsaArtistescCollaborateurs');
    const pochetteAlbumControl = this.chanson.get('pochetteAlbum');
    const chansonUrlControl = this.chanson.get('chansonUrl');
    const lyricsControl = this.chanson.get('lyrics');
    const prixControl = this.chanson.get('prix');

    // Vérifiez que les contrôles ne sont pas null
    if (
      titreChansonControl &&
      nomArtisteControl &&
      nomsaArtistescCollaborateursControl &&
      pochetteAlbumControl &&
      chansonUrlControl &&
      lyricsControl &&
      prixControl
    ) {
      const titreChanson = titreChansonControl.value;
      const nomArtiste = nomArtisteControl.value;
      const nomsaArtistescCollaborateurs = nomsaArtistescCollaborateursControl.value;
      const pochetteAlbum = pochetteAlbumControl.value;
      const chansonUrl = chansonUrlControl.value;
      const lyrics = lyricsControl.value;
      const prix = prixControl.value;

      formData.append('titreChanson', titreChanson);
      formData.append('nomArtiste', nomArtiste);
      formData.append('nomsaArtistescCollaborateurs', nomsaArtistescCollaborateurs);
      formData.append('pochetteAlbum', pochetteAlbum);
      formData.append('chansonUrl', chansonUrl);
      formData.append('lyrics', lyrics);
      formData.append('prix', prix);

      console.log('Form Data:', formData);

      this.chansonService.addChanson(formData).subscribe(
        (response) => {
          console.log(response);
          this.chanson.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Une ou plusieurs valeurs de formulaire sont null ou undefined.');
    }
  }



  onImageSelected(event: any) {
    const pochetteAlbumControl = this.chanson.get('pochetteAlbum');
    if (pochetteAlbumControl) {
      pochetteAlbumControl.setValue(event.target.files[0]);
    } else {
      console.error('La propriété pochetteAlbum est nulle.');
    }
  }

  onFileSelected(event: any) {
    const chansonUrlControl = this.chanson.get('chansonUrl');
    if (chansonUrlControl) {
      chansonUrlControl.setValue(event.target.files[0]);
    } else {
      console.error('La propriété chansonUrl est nulle.');
    }
  }





  getAllChansons() {
    this.chansonService.getListOfSongs(this.currentPage)
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData.data);
        this.chanssonsArray = resultData.data;
        this.chanssonsArray.forEach(chanson => {
          chanson.nomsaArtistescCollaborateurs = Array.isArray(chanson.nomsaArtistescCollaborateurs)
            ? chanson.nomsaArtistescCollaborateurs
            : [chanson.nomsaArtistescCollaborateurs];
        });
      });
  }

  changePage(change: number): void {
    this.currentPage += change;
    this.getAllChansons();
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

  UpdateRecords() {
    // let bodyData = 
    // {
    //   "titreChanson" : this.titreChanson,
    //   "nomArtiste" : this.nomArtiste,
    //   "nomsaArtistescCollaborateurs" : this.nomsaArtistescCollaborateurs,
    //   "pochetteAlbum" : this.pochetteAlbum,
    //   "chansonUrl" : this.chansonUrl,
    //   "lyrics" : this.lyrics,
    //   "prix" : this.prix,

    // };

    const formData = new FormData();

    const titreChansonControl = this.chanson.get('titreChanson');
    const nomArtisteControl = this.chanson.get('nomArtiste');
    const nomsaArtistescCollaborateursControl = this.chanson.get('nomsaArtistescCollaborateurs');
    const pochetteAlbumControl = this.chanson.get('pochetteAlbum');
    const chansonUrlControl = this.chanson.get('chansonUrl');
    const lyricsControl = this.chanson.get('lyrics');
    const prixControl = this.chanson.get('prix');

    // Vérifiez que les contrôles ne sont pas null
    if (
      titreChansonControl &&
      nomArtisteControl &&
      nomsaArtistescCollaborateursControl &&
      pochetteAlbumControl &&
      chansonUrlControl &&
      lyricsControl &&
      prixControl
    ) {
      const titreChanson = titreChansonControl.value;
      const nomArtiste = nomArtisteControl.value;
      const nomsaArtistescCollaborateurs = nomsaArtistescCollaborateursControl.value;
      const pochetteAlbum = pochetteAlbumControl.value;
      const chansonUrl = chansonUrlControl.value;
      const lyrics = lyricsControl.value;
      const prix = prixControl.value;

      formData.append('titreChanson', titreChanson);
      formData.append('nomArtiste', nomArtiste);
      formData.append('nomsaArtistescCollaborateurs', nomsaArtistescCollaborateurs);
      formData.append('pochetteAlbum', pochetteAlbum);
      formData.append('chansonUrl', chansonUrl);
      formData.append('lyrics', lyrics);
      formData.append('prix', prix);

      console.log('Form Data:', formData);
    }

    this.chansonService.updateSong(this.currentChansonID, formData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Updateddd")
      this.isUpdateFormActive = false;
      this.getAllChansons();
      this.chanson.reset();


    });

  }

  save() {
    if (this.currentChansonID == '') {
      this.onSubmit();
    }
    else {
      this.UpdateRecords();
    }
  }
  setDelete(data: any) {
    this.chansonService.deleteSong(data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deletedddd")
      this.getAllChansons();
    });
  }

}






