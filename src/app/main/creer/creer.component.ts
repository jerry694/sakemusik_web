import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChansonsService } from 'src/app/chansons.service';

@Component({
  selector: 'app-creer',
  templateUrl: './creer.component.html',
  styleUrls: ['./creer.component.css']
})
export class CreerComponent implements OnInit {
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
    throw new Error('Method not implemented.');
  }
  save() {
    if (this.currentChansonID == '') {
      this.onSubmit();
    }
    else {
      this.UpdateRecords();
    }
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
      this.chanson.reset();


    });

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
}
