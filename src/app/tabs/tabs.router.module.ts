import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../cliente/list-cliente/list-cliente.module#ListClientePageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../servico/list-servico/list-servico.module#ListServicoPageModule'
          }
        ]
      },
      {
        path: 'addServico',
        children: [
          {
            path: '',
            loadChildren: '../servico/add-servico/add-servico.module#AddServicoPageModule'
          }
        ]
      },
      {
        path: 'addCliente',
        children: [
          {
            path: '',
            loadChildren: '../cliente/add-cliente/add-cliente.module#AddClientePageModule'
          }
        ]
      },
      {
        path: 'addCliente/:id',
        children: [
          {
            path: '',
            loadChildren: '../cliente/add-cliente/add-cliente.module#AddClientePageModule'
          }
        ]
      },
      {
        path: 'addServico/:id',
        children: [
          {
            path: '',
            loadChildren: '../servico/add-servico/add-servico.module#AddServicoPageModule'
          }
        ]
      },
      {
        path: 'perfilCliente/:id',
        children: [
          {
            path: '',
            loadChildren: '../cliente/perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: 'perfilServico/:id',
        children: [
          {
            path: '',
            loadChildren: '../servico/perfil/perfil.module#PerfilPageModule'
          }
        ]
      },
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: '../cliente/login/login.module#LoginPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
