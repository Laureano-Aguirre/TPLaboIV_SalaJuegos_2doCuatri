import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { DatosService } from '../../services/datos.service';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userIngresado!: string;
  passIngresada!: string;
  hide = true;
  loggedUser!: string;
  public loginsColection: any[] = [];
  public countLogins: number = 0;
  isLoading = false;

  constructor(
    private router: Router,
    private firestore: Firestore,
    public auth: Auth,
    public dialog: MatDialog,
    private datosService: DatosService
  ) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  goTo(path: string) {
    this.Logs();
    this.router.navigate([path]);
  }

  goToRegister(path: string) {
    this.router.navigate([path]);
  }

  Login() {
    this.isLoading = true;
    signInWithEmailAndPassword(
      this.auth,
      this.userIngresado,
      this.passIngresada
    )
      .then((res) => {
        this.isLoading = false;
        if (res.user.email !== null) {
          this.loggedUser = res.user.email;
          this.enviarUser();
          this.goTo('home');
        }
      })
      .catch((e) => {
        this.isLoading = false;
        if (e.code === 'auth/invalid-email') {
          this.openErrorDialog(
            'Usuario inválido',
            'El usuario no es válido, intente nuevamente.'
          );
        } else if (e.code === 'auth/invalid-credential') {
          this.openErrorDialog(
            'Usuario inválido',
            'El usuario no es válido, intente nuevamente.'
          );
        } else {
          console.error(e);
          this.openErrorDialog(
            'Usuario inválido',
            'El usuario no es válido, intente nuevamente.'
          );
        }
      });
  }

  enviarUser() {
    this.datosService.setData(this.userIngresado);
  }

  autoComplete() {
    this.userIngresado = 'lau@gmail.com';
    this.passIngresada = 'lau123';
  }

  Logs() {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), user: this.userIngresado });
  }

  GetData() {
    let col = collection(this.firestore, 'logins');

    const observable = collectionData(col);

    observable.subscribe((respuesta) => {
      this.loginsColection = respuesta; //actualizo el array

      this.countLogins = this.loginsColection.length; //actualizo la cantidad de registros que contiene la coleccion

      console.log(respuesta);
    });
  }

  CloseSession() {
    signOut(this.auth).then(() => {
      this.goTo('login');
    });
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      data: { title: title, message: message },
    });
  }
}
