import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/models';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {



  items = [
    { id: 0, value: 'Item 0' },
    { id: 1, value: 'Item 1' },
    { id: 2, value: 'Item 2' },
    { id: 3, value: 'Item 3' },
    { id: 4, value: 'Item 4' },


  ]

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }
  constructor() { }

  resultado: number = 0;
  mensaje: string = "hola eduardp como estas ";
  enable: boolean = false;

  resultados: number[] = [0, 9, 6]

  //variablede objeto
  julio: Estudiante = {
    nombre: 'eduardo',
    apellido: 'cuenca',
    edad: 15,
    sexo: 'F',
    cedula: '12313213231'
  }

  //array de objetos
  estudiantes: Estudiante[] = [
    {
      nombre: 'Migufffffel',
      apellido: 'cudddddenca',
      edad: 154,
      sexo: 'F',
      cedula: '12313213231'
    },
    {
      nombre: 'eduardo',
      apellido: 'chamba',
      edad: 145,
      sexo: 'M',
      cedula: '12313213231'
    }

  ]

  ngOnInit() {
    console.log("hola soi ngOninit");

  }

  getResultados() {
    console.log('estos son los resultados ->', this.estudiantes);

  }
}
