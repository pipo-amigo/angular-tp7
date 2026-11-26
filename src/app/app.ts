import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EnTete } from './composants/en-tete/en-tete';
import { PiedPage } from './composants/pied-page/pied-page';
import { Session } from './services/session';
import { Inscriptions } from './services/inscriptions';

@Component({
  imports: [EnTete, PiedPage, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  session = inject(Session);
  inscriptions = inject(Inscriptions);
  private router = inject(Router);

  deconnecter() {
    this.session.deconnecter();
    this.inscriptions.vider();
    this.router.navigateByUrl('/');
  }
}
