import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  login: boolean = false;

  rol: 'cliente' | 'empresa' = 'empresa'

  constructor(
    public popoverController: PopoverController,
    private auth: AuthService,
    private interaction: ConfirmService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this.auth.logout();
    this.interaction.presentToast('sesion finalizada');
    this.router.navigate(['/login'])
  }



}
