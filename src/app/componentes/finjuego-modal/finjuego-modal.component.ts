import { Component, Inject, EventEmitter, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finjuego-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './finjuego-modal.component.html',
  styleUrl: './finjuego-modal.component.css',
})
export class FinjuegoModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FinjuegoModalComponent>,
    private router: Router
  ) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }

  salir() {
    this.goTo('home');
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
