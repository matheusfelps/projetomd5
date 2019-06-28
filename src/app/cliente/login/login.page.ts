import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

//FireBase
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string = null;
  private pws: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private alertController:AlertController
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.login();
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pws)
      .then(
        res => {
          console.log(res);
        }
        ,
        err => {
          console.log("Usuario não localizado!" + err);
          this.presentAlert("Erro!", "Usuário não localizado!");
        }
      ).catch(
        err => {
          //console.log("Erro ao conectar");  
          this.presentAlert("Erro!", "Não foi possivel conectar ao sistema.\nTente mais tarde!");
        }
      )
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
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
}
