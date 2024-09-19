import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css',
})
export class RegisterModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
