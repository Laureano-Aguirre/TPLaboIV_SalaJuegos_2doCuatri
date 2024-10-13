import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css'],
})
export default class AhorcadoComponent {
  palabras: string[] = ['BOCA', 'MILANESA', 'ASADO', 'MESSI', 'COLAPINTO'];
  palabraActual: string = '';
  palabraOculta: string = '';
  intentos: number = 6;
  letrasUsadas: string[] = [];
  mensaje: string = '';
  alfabeto: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
  letraErronea: boolean = false;
  letraAcertada: boolean = false;
  imagenAhorcado: string = './assets/ahorcado/ahorcado-0.png';
  juegoTerminado: boolean = false;

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabraActual =
      this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = '_'.repeat(this.palabraActual.length);
    this.intentos = 6;
    this.letrasUsadas = [];
    this.mensaje = '';
    this.letraErronea = false;
    this.letraAcertada = false;
    this.imagenAhorcado = './assets/ahorcado/ahorcado-0.png';
    this.juegoTerminado = false;
  }

  intentarLetra(letra: string) {
    if (this.letrasUsadas.includes(letra) || this.juegoTerminado) {
      return;
    }

    this.letrasUsadas.push(letra);

    if (this.palabraActual.includes(letra)) {
      let palabraArray = this.palabraOculta.split('');
      for (let i = 0; i < this.palabraActual.length; i++) {
        if (this.palabraActual[i] === letra) {
          palabraArray[i] = letra;
        }
      }
      this.palabraOculta = palabraArray.join('');

      this.letraAcertada = true;
      setTimeout(() => {
        this.letraAcertada = false;
      }, 300);

      if (!this.palabraOculta.includes('_')) {
        this.mensaje =
          '¡Felicidades! Te pasaste el jueguito y ganaste 3 puntos.';
        this.juegoTerminado = true;
      }
    } else {
      this.intentos--;
      this.letraErronea = true;
      setTimeout(() => {
        this.letraErronea = false;
      }, 300);
      this.actualizarImagenAhorcado();
      if (this.intentos === 0) {
        this.mensaje = `Perdiste. La palabra era: ${this.palabraActual}`;
        this.juegoTerminado = true;
      }
    }
  }

  actualizarImagenAhorcado() {
    const intentosRestantes = 6 - this.intentos;
    this.imagenAhorcado = `./assets/ahorcado/ahorcado-${intentosRestantes}.png`;
  }

  reiniciarJuego() {
    this.iniciarJuego();
  }
}
