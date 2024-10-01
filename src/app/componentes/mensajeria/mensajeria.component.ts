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
    private datosService: DatosService
  ) {}
  ngOnInit() {
    this.GetData();
  }

  EnviarMensaje() {
    let col = collection(this.firestore, 'mensajes');
    this.recibirUser();
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
}
