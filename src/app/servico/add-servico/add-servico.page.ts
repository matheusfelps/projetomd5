import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Servico } from '../servico';
import { ServicoService } from '../servico.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {

  private servico: Servico;
  private id = null;
  private preview: any[] = null;

  slideOpts = {
    slidesPerView: 3,
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private servicoService: ServicoService,
    public alertController: AlertController,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private camera: Camera,
    private sn: DomSanitizer,
    private androidPermissions: AndroidPermissions,
    public loadingController: LoadingController
  ) {
    this.permitir()
  }


  ngOnInit() {
    this.servico = new Servico;
    this.id = this.activeRouter.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.edit(this.id);
    } else {
      this.id = null;
    }
  }


  onSubmit(form) {
    if (this.preview) {
      this.presentLoading();
      if (this.id == null) {
        this.servico.fotos = this.preview;
        this.servicoService.save(this.servico)
          .then(
            res => {
              this.presentAlert("Aviso", "Serviço salvo!");
              form.reset();
              this.servico = new Servico;
              this.router.navigate(['/tabs/tab3']);
            },
            err => {
              this.presentAlert("Erro!!!", "Ops!! Deu erro ao salvar!" + err);
            }
          )
          .catch(
            erros => {
              this.presentAlert("Erro!!!", "Não consegui conectar ao sistma" + erros);
            }
          )
      } else {
        //Atualiza usuario -------------------------
        this.servico.fotos = this.preview;
        this.servicoService.update(this.id, this.servico)
          .then(
            res => {
              this.id = null;
              this.presentAlert("Aviso", this.servico.descricao + ". Foi atualizado!");
              form.reset();
              this.servico = new Servico;
              this.router.navigate(['/tabs/tab3']);
            },
            err => {
              this.presentAlert("Erro!!!", "Ops!! Deu erro na atualização!" + err);
            }
          );
      }
    } else this.presentAlert("Erro!!!", "Voce tem que tirar uma foto!");
  }


  edit(key) {
    this.preview = null;
    this.servicoService.get(key)
      .subscribe(
        res => {
          this.servico = res;
          if (this.servico.fotos) {
            this.preview = this.servico.fotos;
          }
          //console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }


  async tirarFoto() {
    if (!this.preview) {
      this.preview = [];
    }
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview.push(base64Image);
    }, (err) => {
      // Handle error
      console.log("Erro camera:" + err);
    });
  }


  //Alertas ----------------------------------------------
  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });
    await alert.present();
  }


  //Loanding ---------------------------------------------
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }


  //Permissão -------------------------------------------
  permitir() {
    //Verifica se Existe permissão no sistema: Camera
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA)
      .then(
        result => console.log('Has permission?', result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
  }
}
