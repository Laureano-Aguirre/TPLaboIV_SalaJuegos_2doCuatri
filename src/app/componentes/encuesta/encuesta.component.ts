import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit {
  form!: FormGroup;
  usuario!: string;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.recibirUserLocalStorage();
    this.form = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
        apellido: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        edad: [
          '',
          [Validators.required, Validators.min(18), Validators.max(99)],
        ],

        vidas: ['', [Validators.required]],

        ahorcado: [false],
        mayorMenor: [false],
        preguntados: [false],
        ninguno: [false],

        comentarios: ['', [Validators.required, Validators.maxLength(200)]],
      },
      { validators: this.requireAtLeastOneCheckbox }
    );
  }

  requireAtLeastOneCheckbox(formGroup: FormGroup) {
    const ahorcado = formGroup.get('ahorcado')?.value;
    const mayorMenor = formGroup.get('mayorMenor')?.value;
    const preguntados = formGroup.get('preguntados')?.value;
    const ninguno = formGroup.get('ninguno')?.value;

    if (ahorcado || mayorMenor || preguntados || ninguno) {
      return null;
    }
    return { atLeastOneRequired: true };
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get apellido() {
    return this.form.get('apellido');
  }
  get edad() {
    return this.form.get('edad');
  }

  get comentarios() {
    return this.form.get('comentarios');
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  enviarForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.encuestas();
      this.goTo('home');
    } else {
      this.openErrorDialog(
        'Campos obligatorios',
        'Todos los campos deben estar completos'
      );
      console.log('Formulario inválido');
    }
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      data: { title: title, message: message },
    });
  }

  recibirUserLocalStorage() {
    const localStorageUser = localStorage.getItem('loggedUser');

    if (localStorageUser) {
      this.usuario = localStorageUser;
    } else {
      this.router.navigate(['/login']);
    }
  }

  encuestas() {
    if (this.form.valid) {
      let col = collection(this.firestore, 'encuestas');

      addDoc(col, {
        user: this.usuario,
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        edad: this.form.get('edad')?.value,
        vidas: this.form.get('vidas')?.value,
        ahorcado: this.form.get('ahorcado')?.value,
        mayorMenor: this.form.get('mayorMenor')?.value,
        preguntados: this.form.get('preguntados')?.value,
        ninguno: this.form.get('ninguno')?.value,
        comentarios: this.form.get('comentarios')?.value,
      })
        .then(() => {
          console.log('Encuesta guardada exitosamente!');
          this.openErrorDialog('Exito', 'Gracias por completar la encuesta');
          this.goTo('home');
        })
        .catch((error) => {
          console.error('Error al guardar la encuesta:', error);
          this.openErrorDialog(
            'Error',
            'Hubo un problema al guardar la encuesta'
          );
        });
    } else {
      this.openErrorDialog(
        'Campos obligatorios',
        'Todos los campos deben estar completos'
      );
      console.log('Formulario inválido');
    }
  }
}
