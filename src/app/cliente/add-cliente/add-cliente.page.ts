import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ViacepService } from 'src/app/viacep/viacep.service';
import { Address } from 'src/app/viacep/address';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  private cliente: Cliente;
  private id = null;
  private preview: any = null;

  constructor(
    private clienteService: ClienteService,
    private alertController: AlertController,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private camera: Camera,
    private sn: DomSanitizer,
    private androidPermissions: AndroidPermissions,
    private loadingController: LoadingController,
    public toastController: ToastController,
    private viacepService: ViacepService
  ) {
    this.permitir();
  }


  ngOnInit() {
    this.cliente = new Cliente;
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
        //Grava usuario na autenticação ------------------------
        this.clienteService.saveAuth(this.cliente)
          .then(
            res => {
              //Grava dados do usuario no Banco de dados ----------------
              this.cliente.foto = this.preview;
              this.clienteService.save(this.cliente)
                .then(
                  res => {
                    this.presentAlert("Aviso", this.cliente.nome + ". Já tá salvo!");
                    form.reset();
                    this.cliente = new Cliente;
                    this.router.navigate(['/tabs/tab2']);
                  },
                  err => {
                    this.presentAlert("Erro!!!", "Ops!! Deu erro ao salvar!" + err);
                  }
                )
            },
            err => {
              this.presentAlert("Erro!!!", "Usuario já cadastrado!" + err);
            }
          ).catch(
            erros => {
              this.presentAlert("Erro!!!", "Não consegui conectar ao sistma" + erros);
            }
          )
      } else {
        //Atualiza usuario -------------------------
        this.cliente.foto = this.preview;
        this.clienteService.update(this.id, this.cliente)
          .then(
            res => {
              this.id = null;
              this.presentAlert("Aviso", this.cliente.nome + ". Foi atualizado!");
              form.reset();
              this.cliente = new Cliente;
              this.router.navigate(['/tabs/tab2']);
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
    this.clienteService.get(key)
      .subscribe(
        res => {
          this.cliente = res;
          if (this.cliente.foto) {
            this.preview = this.cliente.foto;
          }
          //console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }


  async tirarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
      //this.preview = this.sn.bypassSecurityTrustResourceUrl(base64Image);
      //console.log(this.preview);      
    }, (err) => {
      // Handle error
      console.log("Erro camera:" + err);
    });
  }

  buscaCEP(event) {
    console.log(event.target.value);
    let cep:string = event.target.value;
    if (cep.length == 8) {
      let result = this.viacepService.onClickZipcode(cep);
      if (result != null) {
        this.cliente.endereco = result;
      } else {
        this.presentToast("CEP não localizado!");
        this.cliente.endereco = new Address;
      }
    }
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

  //Avisos -----------------------------------------------
  async presentToast(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
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
