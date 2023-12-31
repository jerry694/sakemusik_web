import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChansonsService } from 'src/app/chansons.service';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.css']
})
export class ModifierComponent implements OnInit {
  chanson: FormGroup;
  currentChansonID!: string;
  selectedPochetteAlbum: File | null = null;
  selectedChansonUrl: File | null = null;

  // id:string=this.activatedRoute.snapshot.params['id']

  constructor(
    private fb: FormBuilder, 
    private chansonService: ChansonsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.chanson = this.fb.group({
      titreChanson: ['', Validators.required],
      nomArtiste: ['', Validators.required],
      nomsaArtistescCollaborateurs: [''],
      pochetteAlbum: [null],  // Modifié pour gérer les fichiers
      chansonUrl: [null, Validators.required],  // Modifié pour gérer les fichiers
      lyrics: [''],
      prix: ['']
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentChansonID = params['id'];
      this.getChanson(this.currentChansonID);
    });
  }

  getChanson(id: string) {
    this.chansonService.oneChanson(parseInt(id)).subscribe((data: any) => {
      // this.chanson.patchValue(data.data[0]);
      this.chanson
      console.log(this.chanson);
      this.chanson = this.fb.group({
        titreChanson: [data.data[0].titreChanson, Validators.required],
        nomArtiste: [data.data[0].nomArtiste, Validators.required],
        nomsaArtistescCollaborateurs: [data.data[0].nomsaArtistescCollaborateurs],
        pochetteAlbum: [null],  // Modifié pour gérer les fichiers
        chansonUrl: [null, Validators.required],  // Modifié pour gérer les fichiers
        lyrics: [data.data[0].lyrics],
        prix: [data.data[0].prix]
      });
    });
  }

  save() {
    if (!this.chanson.valid) {
      console.error('Le formulaire n\'est pas valide.');
      return;
    }

    const formData = new FormData();
    Object.entries(this.chanson.value).forEach(
      ([key, value]: [string, any]) => {
        formData.append(key, value);
      }
    );

    
    if (this.selectedPochetteAlbum) {
      formData.append('pochetteAlbum', this.selectedPochetteAlbum);
    }
    if (this.selectedChansonUrl) {
      formData.append('chansonUrl', this.selectedChansonUrl);
    }
      this.updateRecords(formData);
  }

  onSubmit(formData: FormData) {
    this.chansonService.addChanson(formData).subscribe(
      response => {
        console.log(response);
        this.chanson.reset();
      },
      error => console.error(error)
    );
  }

  updateRecords(formData: FormData) {
    this.chansonService.updateSong(this.currentChansonID, formData).subscribe(
      resultData => {
        console.log(resultData);
        alert('Chanson mise à jour avec succès');
        this.chanson.reset();
      },
      error => console.error(error)
    );
  }

  onImageSelected(event: any) {
    this.selectedPochetteAlbum = event.target.files[0] || null;
  }

  onFileSelected(event: any) {
    this.selectedChansonUrl = event.target.files[0] || null;
  }
}
