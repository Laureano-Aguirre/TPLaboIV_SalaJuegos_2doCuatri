import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private tirosAcertadosSubject = new BehaviorSubject<number>(0);
  tirosAcertados$ = this.tirosAcertadosSubject.asObservable();

  private juegoEnCursoSubject = new BehaviorSubject<boolean>(false);
  juegoEnCurso$ = this.juegoEnCursoSubject.asObservable();

  private botonesSubject = new BehaviorSubject<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );
  botones$ = this.botonesSubject.asObservable();

  private intervalo: any;

  comenzarJuego() {
    this.juegoEnCursoSubject.next(true);
    this.tirosAcertadosSubject.next(0);
    this.mostrarBotonAleatorio();
  }

  private mostrarBotonAleatorio() {
    this.intervalo = setInterval(() => {
      const botones = this.botonesSubject.value.map((row) => [...row]);
      botones.forEach((row) => row.fill(false));
      const fila = Math.floor(Math.random() * 5);
      const columna = Math.floor(Math.random() * 5);
      botones[fila][columna] = true;
      this.botonesSubject.next(botones);

      setTimeout(() => {
        botones[fila][columna] = false;
        this.botonesSubject.next(botones);
      }, 1500);
    }, 2000);
  }

  clickBoton(fila: number, columna: number) {
    const botones = this.botonesSubject.value;
    if (botones[fila][columna]) {
      this.tirosAcertadosSubject.next(this.tirosAcertadosSubject.value + 1);
    }
  }

  detenerJuego() {
    clearInterval(this.intervalo);
    this.juegoEnCursoSubject.next(false);
  }
}
