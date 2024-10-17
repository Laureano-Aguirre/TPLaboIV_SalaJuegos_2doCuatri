import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-puntuacion',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './puntuacion.component.html',
  styleUrls: ['./puntuacion.component.css'],
})
export class PuntuacionComponent implements AfterViewInit {
  displayedColumns: string[] = ['posicion', 'user', 'juego', 'puntos'];
  dataSource = new MatTableDataSource<Usuarios>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private firestore: Firestore) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.GetPuntuacionData();
  }

  GetPuntuacionData() {
    const puntuacionRef = collection(this.firestore, 'puntuacion');
    const q = query(puntuacionRef, orderBy('puntos', 'desc'));

    const observable: Observable<Usuarios[]> = collectionData(q, {
      idField: 'id',
    }).pipe(
      map((data: DocumentData[]) =>
        data.map((doc) => ({
          user: doc['user'] as string,
          juego: doc['juego'] as string,
          puntos: doc['puntos'] as number,
        }))
      )
    );

    observable.subscribe((respuesta) => {
      this.dataSource.data = respuesta;
      console.log(respuesta);
    });
  }
}

export interface Usuarios {
  user: string;
  juego: string;
  puntos: number;
}
