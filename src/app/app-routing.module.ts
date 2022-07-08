import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './backend/setting/setting.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { canActivate } from '@angular/fire/compat/auth-guard';
import { ProductosComponent } from './backend/productos/productos.component';


const uidAdmin = 'zZkiW5uprsNPnRvCJ4jBgxrVwx33';
const onlyAdmin = () => map((user: any) => !!user && (user.uid === uidAdmin));

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'ajustes', component: SettingComponent, ...canActivate(onlyAdmin) },
  { path: 'set_productos', component: ProductosComponent, ...canActivate(onlyAdmin) },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'resultados',
    loadChildren: () => import('./pages/resultados/resultados.module').then(m => m.ResultadosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AngularFireAuthGuard],
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
