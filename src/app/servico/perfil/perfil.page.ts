import { Component, OnInit } from '@angular/core';
import { Servico } from '../servico';
import { ServicoService } from '../servico.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  private servico: Servico;
  private id: string = null;

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private servicoService: ServicoService,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.servico = new Servico;
    this.id = this.activeRouter.snapshot.paramMap.get("id");
    if (this.id) {
      this.servicoService.get(this.id)
        .subscribe(
          res => {
            this.servico = res;
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
