import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-mayormenor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css',
})
export default class MayormenorComponent implements OnInit {
  private readonly cartas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  cartaActual: number = 0;
  cartaSiguiente: number = 0;
  cartaActualSrc: string = '';
  puntuacion: number = 0;
  mensaje: string = '';
  respuestaIncorrecta: boolean = false;
  respuestaCorrecta: boolean = false;
  juegoTerminado: boolean = false;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    this.cartaActual = this.obtenerCartaAleatoria();
    this.cartaSiguiente = this.obtenerCartaAleatoria();
    this.cartaActualSrc = './assets/mayormenor/mayormenor-5.png';
    this.puntuacion = 0;
    this.mensaje = '';
    this.juegoTerminado = false;
  }

  private obtenerCartaAleatoria(): number {
    return Math.floor(Math.random() * 12) + 1;
  }

  private actualizarImagenCarta(): void {
    this.cartaActualSrc = `./assets/mayormenor/mayormenor-${this.cartaActual}.png`;
  }
  intentar(eleccion: 'mayor' | 'menor'): void {
    if (this.juegoTerminado) return;

    let resultado: 'mayor' | 'menor' | 'igual' = 'igual';
    if (this.cartaSiguiente > this.cartaActual) {
      resultado = 'mayor';
    } else if (this.cartaSiguiente < this.cartaActual) {
      resultado = 'menor';
    }

    if (resultado === eleccion) {
      this.puntuacion++;
      this.mensaje = 'Correcto!';
      this.respuestaCorrecta = true;
      setTimeout(() => (this.respuestaCorrecta = false), 500);
    } else if (resultado === 'igual') {
      this.mensaje = 'Empate. Intenta de nuevo.';
    } else {
      this.mensaje = 'Incorrecto. Fin del juego.';
      this.respuestaIncorrecta = true;
      if (this.puntuacion > 0) {
        this.enviarPuntos();
      }
      this.juegoTerminado = true;
      setTimeout(() => (this.respuestaIncorrecta = false), 500);
    }

    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = this.obtenerCartaAleatoria();
    this.actualizarImagenCarta();
  }

  reiniciarJuego(): void {
    if (this.puntuacion > 0) {
      this.enviarPuntos();
    }
    this.iniciarJuego();
  }

  enviarPuntos() {
    let col = collection(this.firestore, 'puntuacion');
    const localStorageUser = localStorage.getItem('loggedUser');
    addDoc(col, {
      user: localStorageUser,
      juego: 'mayor menor',
      puntos: this.puntuacion,
    });
  }
}
