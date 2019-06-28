import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//Google Maps
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation
} from '@ionic-native/google-maps';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  map: GoogleMap;

  constructor(
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
  ) {
   this.permitir();
  }

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    //Opções do mapa
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    //Cria o mapa
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    //Define os pontos de marcação do mapa
    let marker: Marker = this.map.addMarkerSync({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position: {
        lat: 43.0741904,
        lng: -89.3809802
      }
    });

    //Ao clicar no ponto mostra um alerta
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      alert('clicked');
    });
  }

  //Local Atual -------------
  localAtual() {
    this.map.clear(); //Limpa o mapa
    this.map.getMyLocation()
      .then(
        (location: MyLocation) => {
          //console.log(JSON.stringify(location, null, 2));
          //Anima a camera para a posição atual
          this.map.animateCamera({
            target: location.latLng,
            zoom: 18,
            tilt: 30
          });
          //Marca a localização atual
          this.map.addMarker({
            title: 'Ionic',
            snippet: 'A programação hibrida',
            icon: '#ff0000',
            animation: 'DROP',
            zoom: 15,
            position: {
              lat: location.latLng.lat,
              lng: location.latLng.lng
            }
          })
        })
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

    //Permissão -------------------------------------------
    permitir() {
       //Verifica se Existe permissão no sistema: GPS
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.LOCATION)
        .then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LOCATION)
        );
    }
}
