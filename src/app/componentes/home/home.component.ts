import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  rutaAhorcado: string = 'ahorcado';
  rutaMayorMenor: string = 'mayormenor';
  rutaPreguntados: string = 'preguntados';
  rutaMiJuego: string = 'mi-juego';
  user!: string;
  userIngresado!: string;

  constructor(private router: Router, private datosService: DatosService) {}

  ngOnInit() {
    this.recibirUser();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  recibirUser() {
    this.user = this.datosService.Data;
  }

  enviarUser() {
    this.datosService.setData(this.userIngresado);
  }
}
