import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  artistas: any[] = [];
  urlBusqueda = 'https://api.spotify.com/v1/search';
  urlArtista = 'https://api.spotify.com/v1/artists';

  constructor(private http: Http) {}

  getArtistas(termino: string) {
    // tslint:disable-next-line:prefer-const
    let query = `?q=${ termino }&type=artist`;
    // tslint:disable-next-line:prefer-const
    let url = this.urlBusqueda + query;

    return this.http.get(url)
        .map(res => {
          // console.log(res.json().artists.items);
          this.artistas = res.json().artists.items;
          console.log(this.artistas);

          // return res.json().artists.items;
        });
  }

  getArtista(id: string) {
    // tslint:disable-next-line:prefer-const
    let query = `/${ id }`;
    // tslint:disable-next-line:prefer-const
    let url = this.urlArtista + query;

    return this.http.get(url)
        .map(res => {
          console.log(res.json());
          return res.json();
        });
  }

  getTop(id: string) {
    // tslint:disable-next-line:prefer-const
    let query = `/${ id }/top-tracks?country=US`;
    // tslint:disable-next-line:prefer-const
    let url = this.urlArtista + query;

    return this.http.get(url)
        .map(res => {
          console.log(res.json().tracks);
          return res.json().tracks;
        });
  }
}
