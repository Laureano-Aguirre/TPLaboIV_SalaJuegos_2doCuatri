import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css',
})
export class QuienSoyComponent implements OnInit {
  texto: string = `Hola, soy Laureano! y te voy a contar sobre mí. Empece la tecnicatura en 2021, tengo 23 años, y no me canse de recursar labo 2(?), pero sí, fue de las que más me atrasó. Por suerte me di cuenta que tenía que ponerme las pilas y dejar de perder el tiempo. Me gusta el desarrollo WEB, y me interesaría seguir aprendiendo (de hecho en paralelo hago un curso de desarrollo WEB full stack en NUCBA, 1 añito, heavy je). Laburo en el rubro de analista de sistemas y tester desde la experiencia de usuario. 
  Adjunto una foto mía de chiquito porque pintó (?). Un saludo y espero que pierdas el juego porque si lo ganas significa que voy a tener que codear hasta que alguno lo gane, y tiene pinta de que va a terminar como el pibito que se pasó el tetris y el juego la quedó en el nivel 156 jeje.`;

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
