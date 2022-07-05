import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/models/models';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  data: Resultado = {
    equipo1: {
      nombre: "",
      goles: null
    },
    equipo2: {
      nombre: '',
      goles: null,
    },
    arbitro: 'jorge perez',
    id: '',
  }

  ajustes: any[] = [];
  constructor(private database: FirestoreService, private interaction: ConfirmService) { }

  ngOnInit() {
    console.log('hola estamos en ajustes');

  }

  leerAjustesSecretos() {
    const path = "Ajustes";
    this.database.getCollection(path).subscribe((res) => {
      console.log('leerAjustesSecretos ->', res);
      this.ajustes = res;

    })

  }

  crearNuevoResultado() {
    console.log(this.data);

    this.interaction.showLoading('Guardando')

    const path = "Iglesias";
    const id = this.database.getId();
    this.data.id = id;
    this.database.createDoc(this.data, path, id).then((res) => {
      console.log('Guardado copn exito ->', res);
      this.interaction.closeLoading();
      this.interaction.presentToast('guardado con exito')

    })
  }


}
