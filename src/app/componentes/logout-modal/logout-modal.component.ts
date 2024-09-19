import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  MAT_DIALOG_DATA,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { signOut } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './logout-modal.component.html',
  styleUrl: './logout-modal.component.css',
})
export class LogoutModalComponent {
  constructor(
    private dialogRef: MatDialogRef<LogoutModalComponent>,
    private dialog: MatDialog,
    private router: Router,
    public auth: Auth
  ) {}

  close() {
    this.dialogRef.close();
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  CloseSession() {
    signOut(this.auth).then(() => {
      this.goTo('login');
    });
    this.dialogRef.close();
  }
}
