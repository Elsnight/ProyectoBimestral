import { Component, OnInit } from '@angular/core';
import { Equipo, equipoI, Paises } from 'src/app/models/models';
import { ConfirmService } from 'src/app/services/confirm.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  equipos: equipoI[] = [];
  newEquipo: equipoI;

  paises = Paises;

  constructor(private database: FirestoreService,

    private interaction: ConfirmService) { }

  ngOnInit() {
    this.loadProductos();
  }


  addNew() {
    this.newEquipo = {
      nombre: '',
      pais: null,
      posicion: null,
      id: this.database.getId()
    }
  }

  loadProductos() {
    const path = 'Iglesias';
    this.database.getCollection<equipoI>(path).subscribe(res => {
      if (res) {
        this.equipos = res;
      }
    })
  }

  editar(equipo: equipoI) {
    console.log('editar ->,', equipo);
    this.newEquipo = equipo;
  }

  async eliminar(equipo: equipoI) {
    const res = await this.interaction.presentAlert('alerta', 'seguro que deseas eliminar?');
    console.log('res ->', res);
    if (res) {
      const path = 'Iglesias';

      await this.database.deleteDoc(path, equipo.id)
      this.interaction.presentToast('Eliminado con exito');
    }
  }

  async guardar() {
    await this.interaction.showLoading('guardando...')
    console.log('datos a guarad ->', this.newEquipo);
    const path = 'Iglesias';
    await this.database.createDoc(this.newEquipo, path, this.newEquipo.id);
    this.interaction.presentToast('guardado con exito');
    this.interaction.closeLoading();

  }

}
