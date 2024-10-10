import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css',
})
export class QuienSoyComponent implements OnInit {
  texto: string = `Hola, soy Laureano! En esta pagina te vas a encontrar con 4 juegos bastante copados. Pero antes que nada, voy a explicarte como es mi propio juego. Basicamente hay que tener muy buena punteria, ya que el juego se trata de alcanzar los 10 tiros acertados!`;

  textoCompletoFlag: boolean = false;
  mostrarFoto: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.typeWriterEffect();
  }

  typeWriterEffect() {
    const element = document.getElementById('typewriter');
    let index = 0;
    const velocidad = 10; // ms por letra

    const typeWriter = () => {
      if (index < this.texto.length) {
        if (element) {
          element.innerHTML += this.texto.charAt(index);
        }
        index++;
        setTimeout(typeWriter, velocidad);
      } else {
        // El texto se ha completado
        this.textoCompletoFlag = true;
        this.mostrarFoto = true;
      }
    };

    typeWriter();
  }
}
