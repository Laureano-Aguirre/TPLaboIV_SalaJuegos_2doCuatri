import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { CommonModule } from '@angular/common';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
    svg: string;
  };
}

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export default class PreguntadosComponent implements OnInit {
  paises: Country[] = [];
  selectedPais: Country | null = null;
  opciones!: string[];
  loading: boolean = true;
  error: string = '';
  respuestaEstado!: boolean | null;
  vidas: number = 3;
  puntos: number = 0;

  constructor(
    private datosService: DatosService,
    public dialog: MatDialog,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.loadPaises();
  }

  loadPaises() {
    this.loading = true;
    this.datosService.getPaises().subscribe({
      next: (paises: Country[]) => {
        this.paises = paises;
        this.loading = false;
        this.nuevaPregunta();
      },
      error: (err) => {
        this.error =
          'Hubo un error al cargar los paises. Por favor, intente de nuevo.';
        this.loading = false;
        console.error('Error loading paises:', err);
      },
    });
  }

  nuevaPregunta() {
    if (this.paises.length < 4) {
      this.error =
        'No hay suficientes paises para generar una pregunta, intente mas tarde';
      return;
    }

    this.respuestaEstado = null;
    const randomIndex = Math.floor(Math.random() * this.paises.length);
    this.selectedPais = this.paises[randomIndex];

    this.opciones = [this.selectedPais.name.common];
    while (this.opciones.length < 4) {
      const opcion =
        this.paises[Math.floor(Math.random() * this.paises.length)].name.common;
      if (!this.opciones.includes(opcion)) {
        this.opciones.push(opcion);
      }
    }
    this.opciones = this.opciones.sort(() => Math.random() - 0.5);
  }

  verificarRespuesta(opcionElegida: string) {
    if (this.selectedPais && opcionElegida === this.selectedPais.name.common) {
      this.respuestaEstado = true;
      this.puntos++;
    } else {
      this.respuestaEstado = false;
      this.vidas--;
      if (this.vidas === 0) {
        this.finDeJuego();
      }
    }

    setTimeout(() => {
      this.nuevaPregunta();
    }, 2000);
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
        if (this.puntos > 0) {
          this.enviarPuntos();
        }
        this.router.navigate(['/home']);
      }
    });
  }

  finDeJuego() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Fin del juego',
        message: 'Perdiste! Queres seguir jugando, o salir del juego?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        if (this.puntos > 0) {
          this.enviarPuntos();
        }
        this.router.navigate(['/home']);
      } else {
        if (this.puntos > 0) {
          this.enviarPuntos();
        }
        this.vidas = 3;
        this.puntos = 0;
      }
    });
  }

  enviarPuntos() {
    let col = collection(this.firestore, 'puntuacion');
    const localStorageUser = localStorage.getItem('loggedUser');
    addDoc(col, {
      user: localStorageUser,
      juego: 'preguntados',
      puntos: this.puntos,
    });
  }
}
