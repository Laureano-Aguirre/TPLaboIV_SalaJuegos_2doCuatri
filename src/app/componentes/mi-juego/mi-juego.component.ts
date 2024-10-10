import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FinjuegoModalComponent } from '../finjuego-modal/finjuego-modal.component';

interface Cuadrado {
  visible: boolean;
  id: number;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.css'],
})
export class MiJuegoComponent implements OnInit, OnDestroy {
  tirosAcertados: number = 0;
  filas: Cuadrado[][] = [];
  juegoEnCurso: boolean = false;
  cuadradoActual: Cuadrado | null = null;
  temporizador: any;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.inicializarFilas();
  }

  ngOnDestroy() {
    this.detenerJuego();
  }

  inicializarFilas() {
    for (let i = 0; i < 5; i++) {
      this.filas.push(
        Array(5)
          .fill(null)
          .map((_, index) => ({ visible: false, id: i * 5 + index }))
      );
    }
  }

  cambiarEstadoJuego() {
    if (this.juegoEnCurso) {
      this.detenerJuego();
    } else {
      this.comenzarJuego();
    }
  }

  comenzarJuego() {
    this.juegoEnCurso = true;
    this.tirosAcertados = 0;
    this.mostrarSiguienteCuadrado();
  }

  detenerJuego() {
    this.juegoEnCurso = false;
    if (this.temporizador) {
      clearTimeout(this.temporizador);
    }
    if (this.cuadradoActual) {
      this.cuadradoActual.visible = false;
    }
    this.cuadradoActual = null;
  }

  mostrarSiguienteCuadrado() {
    if (!this.juegoEnCurso) return;

    if (this.cuadradoActual) {
      this.cuadradoActual.visible = false;
    }

    const cuadradosDisponibles = this.filas.flat().filter((c) => !c.visible);
    if (cuadradosDisponibles.length === 0) {
      this.finalizarJuego();
      return;
    }

    const indiceAleatorio = Math.floor(
      Math.random() * cuadradosDisponibles.length
    );
    this.cuadradoActual = cuadradosDisponibles[indiceAleatorio];
    this.cuadradoActual.visible = true;

    this.temporizador = setTimeout(() => {
      if (this.cuadradoActual && this.cuadradoActual.visible) {
        this.cuadradoActual.visible = false;
        this.mostrarSiguienteCuadrado();
      }
    }, 800);
  }

  clickCuadrado(cuadrado: Cuadrado) {
    if (cuadrado.visible) {
      this.tirosAcertados++;
      cuadrado.visible = false;
      clearTimeout(this.temporizador);
      if (this.tirosAcertados === 10) {
        const dialogRef = this.dialog.open(FinjuegoModalComponent);
      } else {
        this.mostrarSiguienteCuadrado();
      }
    }
  }

  finalizarJuego(
    mensaje: string = `¡Juego terminado! Tiros acertados: ${this.tirosAcertados}`
  ) {
    this.detenerJuego();
    alert(mensaje);
  }

  salir() {
    this.detenerJuego();
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Salir del juego',
        message: '¿Está seguro que desea salir del juego?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/home']);
      }
    });
  }
}
