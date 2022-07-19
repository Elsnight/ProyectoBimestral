import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GooglemapsComponent } from 'src/app/components/googlemaps/googlemaps.component';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { cliente, equipoI, Estudiante, Resultado, ResultadoI, SitiosTuristicos, TipoDeSitios } from '../../models/models';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  equipos: SitiosTuristicos[] = [];
  newEquipo: SitiosTuristicos;

  sitios = TipoDeSitios;

  // items = [
  //   { id: 0, value: 'Item 0' },
  //   { id: 1, value: 'Item 1' },

  // ]

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

  resultados: SitiosTuristicos[] = [];
  // iglesias: ResultadoI[] = [];


  constructor(
    private animationCtrl: AnimationController,
    private modalController: ModalController,
    private database: FirestoreService,
    private interaction: ConfirmService) { }



  //resultado: number = 0;
  // mensaje: string = "hola eduardp como estas ";
  // enable: boolean = false;

  // resultados: number[] = [0, 9, 6]

  //variablede objeto
  // julio: Estudiante = {
  //   nombre: 'eduardo',
  //   apellido: 'cuenca',
  //   edad: 15,
  //   sexo: 'F',
  //   cedula: '12313213231'
  // }

  //array de objetos
  // estudiantes: Estudiante[] = [
  //   {
  //     nombre: 'Migufffffel',
  //     apellido: 'cudddddenca',
  //     edad: 154,
  //     sexo: 'F',
  //     cedula: '12313213231'
  //   },
  //   {
  //     nombre: 'eduardo',  // resultados: Resultado[] = [];

  //     edad: 145,
  //     sexo: 'M',
  //     cedula: '12313213231'
  //   }

  // ]

  ngOnInit() {
    this.loadProductos();


    // console.log("hola soi ngOninit");
    // this.getResultados();
    // this.getIglesia();
  }

  addNew() {
    this.newEquipo = {
      nombre: '',
      pais: null,
      posicion: null,
      ubicacion: null,
      id: this.database.getId()
    }
  }


  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  loadProductos() {
    const path = 'SitiosTuristicos';
    this.database.getCollection<SitiosTuristicos>(path).subscribe(res => {
      if (res) {
        this.equipos = res;
      }
    })
  }
  // getResultados() {
  //   this.database.getCollection<ResultadoI>('Resultados').subscribe(res => {
  //     console.log('esta es la lectura', res);
  //     this.resultados = res;

  //   });
  //   // this.database.getCollection<ResultadoI>('Iglesias').subscribe(res1 => {
  //   //   console.log('esta es la lectura', res1);
  //   //   this.resultados = res1;

  //   // })
  // }

  // getIglesia() {
  //   this.database.getCollection<ResultadoI>('Iglesias').subscribe(res1 => {
  //     console.log('esta es la lectura', res1);
  //     this.iglesias = res1;

  //   })
  // }

  addSitioTuristico() {
    console.log('agregar citio turistico');

  }

  async addDirection() {

    const ubicacion = this.newEquipo.ubicacion;
    console.log('esta una ubicaicon', ubicacion);

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
      this.newEquipo.ubicacion = data.pos;
      console.log('this.cliente -> ', this.cliente);
    }
  }

  async showMap() {
    console.log('mostrar mapa');
    this.database.getCollection<SitiosTuristicos>('SitiosTuristicos').subscribe(
      res => {
        console.log(res);
        this.resultados = res;

      }
    )


  }
  async eliminar(equipo: SitiosTuristicos) {
    const res = await this.interaction.presentAlert('alerta', 'seguro que deseas eliminar?');
    console.log('res ->', res);
    if (res) {
      const path = 'SitiosTuristicos';

      await this.database.deleteDoc(path, equipo.id)
      this.interaction.presentToast('Eliminado con exito');
    }
  }

  editar(equipo: SitiosTuristicos) {
    console.log('editar ->,', equipo);
    this.newEquipo = equipo;
  }

  async guardar() {
    await this.interaction.showLoading('guardando...')
    console.log('datos a guarad ->', this.newEquipo);
    const path = 'SitiosTuristicos';
    await this.database.createDoc(this.newEquipo, path, this.newEquipo.id);
    this.interaction.presentToast('guardado con exito');
    this.interaction.closeLoading();

  }
}
