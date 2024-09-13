import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatosService {
  private data!: string;

  constructor() {}

  public setData(data: string) {
    this.data = data;
  }

  public get Data() {
    return this.data;
  }
}
