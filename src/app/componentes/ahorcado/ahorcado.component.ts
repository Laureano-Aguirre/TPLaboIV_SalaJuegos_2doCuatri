import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
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
  }

  intentarLetra(letra: string) {
    if (this.letrasUsadas.includes(letra)) {
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

      if (!this.palabraOculta.includes('_')) {
        this.mensaje =
          '¡Felicidades! Te pasaste el jueguito y ganaste 3 puntos.';
      }
    } else {
      this.intentos--;
      this.letraErronea = true;
      setTimeout(() => {
        this.letraErronea = false;
      }, 300);
      if (this.intentos === 0) {
        this.mensaje = `Perdiste. La palabra era: ${this.palabraActual}`;
      }
    }
  }

  reiniciarJuego() {
    this.iniciarJuego();
  }
}
