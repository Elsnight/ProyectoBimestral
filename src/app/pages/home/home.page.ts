import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/components/googlemaps/googlemaps.component';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { cliente, Estudiante, Resultado, ResultadoI } from '../../models/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items = [
    { id: 0, value: 'Item 0' },
    { id: 1, value: 'Item 1' },

  ]

  trackItems(index: number, itemObject: any) {
    return itemObject.id;
  }

  cliente: cliente = {
    uid: '',
    email: '',
    celular: '',
    foto: '',
    referencia: '',
    nombre: '',
    ubicacion: null,
  };

  resultados: Resultado[] = [];
  iglesias: ResultadoI[] = [];


  constructor(private modalController: ModalController, private database: FirestoreService, private interaction: ConfirmService) { }

  //resultado: number = 0;
  mensaje: string = "hola eduardp como estas ";
  enable: boolean = false;

  // resultados: number[] = [0, 9, 6]

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
    // console.log("hola soi ngOninit");
    // this.getResultados();
    // this.getIglesia();
  }

  getResultados() {
    this.database.getCollection<ResultadoI>('Resultados').subscribe(res => {
      console.log('esta es la lectura', res);
      this.resultados = res;

    });
    // this.database.getCollection<ResultadoI>('Iglesias').subscribe(res1 => {
    //   console.log('esta es la lectura', res1);
    //   this.resultados = res1;

    // })
  }

  getIglesia() {
    this.database.getCollection<ResultadoI>('Iglesias').subscribe(res1 => {
      console.log('esta es la lectura', res1);
      this.iglesias = res1;

    })
  }

  addSitioTuristico() {
    console.log('agregar citio turistico');

  }

  async addDirection() {

    const ubicacion = this.cliente.ubicacion;
    let positionInput = {
      lat: -2.898116,
      lng: -78.99958149999999
    };
    if (ubicacion !== null) {
      positionInput = ubicacion;
    }

    const modalAdd = await this.modalController.create({
      component: GooglemapsComponent,
      mode: 'ios',
      swipeToClose: true,//cerrar cuando bajemos
      componentProps: { position: positionInput }
    });
    await modalAdd.present();

    const { data } = await modalAdd.onWillDismiss();
    if (data) {
      console.log('data -> ', data);
      this.cliente.ubicacion = data.pos;
      console.log('this.cliente -> ', this.cliente);
    }

  }
}
