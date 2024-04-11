import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonButton, IonIcon, IonModal, IonContent, IonImg, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { syncOutline } from 'ionicons/icons';

import { IFotos } from 'src/app/_data/interfaces/IFotos';
import { FOTOS_MOCK } from 'src/app/_data/mocks/Fotos.mock';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonModal, IonContent, IonImg, IonGrid, IonRow, IonCol]
})
export class LoaderComponent implements OnInit {

  @Input()
  route: string = '';

  loader: boolean = false;
  imagesData: IFotos = FOTOS_MOCK;

  imagen: string = '';
  texto: string = '';

  index: number = 0;
  timeOutEvent: any;

  constructor(private router: Router) {
    addIcons({ syncOutline });
  }

  ngOnInit() {
  }
  
  getImagesData(): void {
    const localData = localStorage.getItem('fotos');
    if (localData) this.imagesData = JSON.parse(localData) as IFotos;
    console.info(this.imagesData);
  }

  showLoader() {
    this.loader = true;
    this.getImagesData();
    this.showLoaderImage();
  }

  showLoaderImage() {
    if (this.index < this.imagesData.fotos.length) {
      this.imagen = this.imagesData.fotos[this.index].url;
      this.texto = this.imagesData.fotos[this.index].texto;

      this.timeOutEvent = setTimeout(() => {
        this.index += 1;
        this.showLoaderImage();
      }, this.imagesData.tiempoTransicion);

    } else {
      this.index = 0;
      this.loader = false;
      setTimeout(() => this.router.navigate([this.route]), 100);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.timeOutEvent);
  }

}
