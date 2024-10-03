import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

interface Cuadrado {
  visible: boolean;
  id: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.css'],
})
export class MiJuegoComponent implements OnInit {
  tirosAcertados: number = 0;
  filas: Cuadrado[][] = [];
  juegoEnCurso: boolean = false;
  cuadradoActual: Cuadrado | null = null;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.inicializarFilas();
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

  comenzarJuego() {
    this.juegoEnCurso = true;
    this.tirosAcertados = 0;
    this.mostrarSiguienteCuadrado();
  }

  mostrarSiguienteCuadrado() {
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

    setTimeout(() => {
      if (this.cuadradoActual && this.cuadradoActual.visible) {
        this.cuadradoActual.visible = false;
        this.mostrarSiguienteCuadrado();
      }
    }, 1500);
  }

  clickCuadrado(cuadrado: Cuadrado) {
    if (cuadrado.visible) {
      this.tirosAcertados++;
      cuadrado.visible = false;
      this.mostrarSiguienteCuadrado();
    }
  }

  finalizarJuego() {
    this.juegoEnCurso = false;
    alert(`¡Juego terminado! Tiros acertados: ${this.tirosAcertados}`);
  }

  salir() {
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
