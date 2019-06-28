import { Component } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { ServicoService } from '../servico/servico.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  private contCliente: number = 0;
  private contServico: number = 0;

  constructor(
    private clienteService: ClienteService,
    private servicoService: ServicoService
  ) {
  }

  ngOnInit() {
    this.contadores();
  }

  contadores() {
    //Clientes -------------------------
    this.clienteService.getAll()
      .subscribe(
        i => this.contCliente = i.length
      )
    //Servicos -------------------------
    this.servicoService.getAll()
      .subscribe(
        i => this.contServico = i.length
      )
  }
}
