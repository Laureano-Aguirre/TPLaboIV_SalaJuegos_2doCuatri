import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { CommonModule } from '@angular/common';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

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

  constructor(
    private datosService: DatosService,
    public dialog: MatDialog,
    private router: Router
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
    } else {
      this.respuestaEstado = false;
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
        this.router.navigate(['/home']);
      }
    });
  }
}
