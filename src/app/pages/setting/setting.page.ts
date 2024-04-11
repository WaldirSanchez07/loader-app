import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonItem, IonInput,
  IonImg, IonButton, IonGrid, IonRow, IonCol, IonRange, IonLabel, IonToast
} from '@ionic/angular/standalone';

import { IFotos } from 'src/app/_data/interfaces/IFotos';
import { FOTOS_MOCK } from 'src/app/_data/mocks/Fotos.mock';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonItem, IonInput, IonImg, IonButton, IonGrid, IonRow, IonCol, IonRange, IonLabel, IonToast, CommonModule, ReactiveFormsModule
  ]
})
export class SettingPage implements OnInit {
  fotosData: IFotos = FOTOS_MOCK;

  form: FormGroup;
  isToastOpen = false;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      tiempoTransicion: 1000,
      fotos: this.fb.array([])
    })
  }

  ngOnInit() {
    const localData = localStorage.getItem('fotos');
    if (localData) {
      this.fotosData = JSON.parse(localData) as IFotos;
      this.form.get('tiempoTransicion')?.setValue(this.fotosData.tiempoTransicion);
    }

    this.fotosData.fotos.map(item => {
      const imagen = this.fb.group({
        url: item.url,
        texto: item.texto
      });

      this.fotos.push(imagen);
    });
  }

  get fotos(): FormArray {
    return this.form.get('fotos') as FormArray
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  onSave(): void {
    localStorage.setItem('fotos', JSON.stringify(this.form.value));
    this.toggleToast();
  }

  toggleToast() {
    this.isToastOpen = !this.isToastOpen;
  }

}
