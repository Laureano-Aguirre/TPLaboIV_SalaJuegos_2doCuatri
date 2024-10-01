import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { CommonModule } from '@angular/common';

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

  constructor(private datosService: DatosService) {}

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
      alert('Le pegaste crack');
    } else {
      alert('Le pifiaste cabezon');
    }
  }
}
