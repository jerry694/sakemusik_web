import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChansonsService {

  private apiUrl = 'http://localhost:3000/chansons/addSong';
  private apiurl = 'http://localhost:3000/chansons';

  constructor(private http: HttpClient) {}

  addChanson(chansonData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, chansonData);
  }

  getListOfSongs(page: number): Observable<any> {
    const url = `${this.apiurl}?page=${page}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while fetching the list of songs.');
      })
    );
  }

  oneChanson(id: number): Observable<any> {
    return this.http.get(this.apiurl + "/one/" + id)
  }

  
  updateSong(id: any, updatedSongData: FormData): Observable<any> {
    const url = `${this.apiurl}/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(url, updatedSongData).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while updating the song.');
      })
    );
  }

  deleteSong(id: any): Observable<any> {
    const url = `${this.apiurl}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while deleting the song.');
      })
    );
  }
}
