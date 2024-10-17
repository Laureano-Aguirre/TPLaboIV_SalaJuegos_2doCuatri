import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';
import { DatosService } from '../../services/datos.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatIcon, MatMenuModule, MatToolbarModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  rutaQuienSoy: string = 'quien-soy';
  rutaHome: string = 'home';
  rutaPuntuacion: string = 'puntuacion';
  rutaMensajeria: string = 'mensajeria';
  rutaEncuesta: string = 'encuesta';
  user!: string;

  constructor(
    private router: Router,
    public auth: Auth,
    public dialog: MatDialog,
    public datosService: DatosService
  ) {}

  ngOnInit() {
    this.recibirUser();
    this.recibirUserLocalStorage();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
  displayModalLogout(): void {
    const dialogRef = this.dialog.open(LogoutModalComponent);
  }

  recibirUser() {
    this.user = this.datosService.Data;
  }

  recibirUserLocalStorage() {
    const localStorageUser = localStorage.getItem('loggedUser');

    if (localStorageUser) {
      this.user = localStorageUser;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
