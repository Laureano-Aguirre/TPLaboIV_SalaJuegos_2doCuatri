import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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

  constructor(
    private router: Router,
    private firestore: Firestore,
    public auth: Auth,
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
    signInWithEmailAndPassword(
      this.auth,
      this.userIngresado,
      this.passIngresada
    )
      .then((res) => {
        if (res.user.email !== null) {
          this.loggedUser = res.user.email;
          this.enviarUser();
          this.goTo('home');
        }
      })
      .catch((e) => {
        if (e.code === 'auth/invalid-email') {
          alert('Usuario incorrecto.');
        } else if (e.code === 'auth/invalid-credential') {
          alert('Contraseña incorrecta.');
        } else {
          console.error(e);
          alert('Error al iniciar sesión. Por favor, intenta más tarde.');
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
}
