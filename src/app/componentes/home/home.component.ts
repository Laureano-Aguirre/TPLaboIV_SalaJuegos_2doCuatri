import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  rutaAhorcado: string = 'ahorcado';
  rutaMayorMenor: string = 'mayormenor';
  rutaPreguntados: string = 'preguntados';
  rutaMiJuego: string = 'mi-juego';

  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
