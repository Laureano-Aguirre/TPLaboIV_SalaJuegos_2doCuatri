import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private data!: string;
  public propiedad!: string;
  http = inject(HttpClient);

  constructor() {}

  public setData(data: string) {
    this.data = data;
  }

  public get Data() {
    return this.data;
  }

  public getDos() {
    let auxPropiedad = this.propiedad;
    this.propiedad = '';
    return auxPropiedad;
  }

  getPaises() {
    return this.http.get<any[]>('https://restcountries.com/v3.1/all').pipe(
      map((paises) =>
        paises.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          } else if (a.name.common > b.name.common) {
            return 1;
          } else {
            return 0;
          }
        })
      )
    );
  }
}
