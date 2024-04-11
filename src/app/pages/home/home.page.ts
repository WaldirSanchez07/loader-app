import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { settingsOutline, chevronForwardOutline } from 'ionicons/icons';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, LoaderComponent],
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({
      settingsOutline,
      chevronForwardOutline
    });
  }

  goSetting(): void {
    this.router.navigate(['/setting']);
  }

}
