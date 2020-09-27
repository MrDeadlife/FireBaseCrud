import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://fir-project-14a66.firebaseio.com';
  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    );
  }
  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe,
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArreglo),
      delay(0));//retardar la data
  }
  private crearArreglo(heroeObj: object) {
    const heroes: HeroeModel[] = [];
    //console.log(heroes);
    if (heroeObj === null) {
      return [];
    }

    Object.keys(heroeObj).forEach((key) => {
      const heroe: HeroeModel = heroeObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }

  heroByID(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  deleteHero(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
