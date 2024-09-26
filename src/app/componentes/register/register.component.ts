import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { DatosService } from '../../services/datos.service';
import { Firestore } from '@angular/fire/firestore';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  hide = true;
  userNuevo!: string;
  passNueva!: string;
  passNuevaConfirm!: string;
  loggedUser!: string;
  isLoading = false;

  constructor(
    private router: Router,
    private firestore: Firestore,
    public auth: Auth,
    public dialog: MatDialog,
    private datosService: DatosService
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

  Register() {
    this.isLoading = true;
    if (this.passNueva === this.passNuevaConfirm) {
      createUserWithEmailAndPassword(this.auth, this.userNuevo, this.passNueva)
        .then((res) => {
          this.isLoading = false;
          if (res.user.email !== null) this.loggedUser = res.user.email;
          this.enviarUser();
          this.openErrorDialog(
            'Exito!',
            'Exito al registrarse, sera redirigido al login.'
          );
          this.goTo('login');
        })
        .catch((e) => {
          this.isLoading = false;
          if (e.code === 'auth/invalid-email') {
            this.openErrorDialog(
              'Usuario inválido',
              'El usuario no es válido.'
            );
          } else {
            console.error(e);
            this.openErrorDialog(
              'Error al registrar',
              'Error al registrar la cuenta. Por favor, intenta más tarde.'
            );
          }
        });
    } else {
      this.isLoading = false;
      this.openErrorDialog(
        'Contraseñas no coinciden',
        'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.'
      );
    }
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      data: { title: title, message: message },
    });
  }

  enviarUser() {
    this.datosService.setData(this.userNuevo);
  }
}
