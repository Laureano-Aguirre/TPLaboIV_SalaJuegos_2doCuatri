import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  orderBy,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css',
})
export class MensajeriaComponent implements OnInit {
  public mensajesCollection: any[] = [];
  public user!: string;
  public countLogins!: number;
  public mensaje!: string;

  constructor(
    private firestore: Firestore,
    private datosService: DatosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.GetData();
    this.recibirUser();
    this.recibirUserLocalStorage();
  }

  EnviarMensaje() {
    let col = collection(this.firestore, 'mensajes');
    const fecha = new Date();

    addDoc(col, {
      fecha: fecha,
      user: this.user,
      mensaje: this.mensaje,
    });
    this.mensaje = '';
  }

  GetData() {
    const mensajesRef = collection(this.firestore, 'mensajes');
    const q = query(mensajesRef, orderBy('fecha', 'asc'));
    const observable = collectionData(q);
    observable.subscribe((respuesta) => {
      this.mensajesCollection = respuesta;
      this.countLogins = this.mensajesCollection.length;
      console.log(respuesta);
    });
  }

  recibirUser() {
    this.user = this.datosService.Data;
  }

  recibirUserLocalStorage() {
    const localStorageUser = localStorage.getItem('loggedUser');

    if (localStorageUser) {
      this.user = localStorageUser;
    } else {
      this.router.navigate(['/home']);
    }
  }

  isCurrentUser(messageUser: string): boolean {
    return messageUser === this.user;
  }
}
