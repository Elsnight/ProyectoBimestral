import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;

  rol: 'cliente' | 'empresa' = 'empresa'

  constructor(public popoverController: PopoverController) { }

  ngOnInit() {

  }



}
