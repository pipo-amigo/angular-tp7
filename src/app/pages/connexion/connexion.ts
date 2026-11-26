import { Component, Input, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Session } from '../../services/session';
import { Inscriptions } from '../../services/inscriptions';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
})
export class Connexion {
  private session = inject(Session);
  private router = inject(Router);
  private inscriptions = inject(Inscriptions);

  // Reçoit le paramètre ?retour=... de l'URL (renseigné par le guard)
  @Input() retour = '';
  nom = '';
  erreur = signal('');

  seConnecter() {
    this.session.connecter(this.nom);
    this.inscriptions.charger().subscribe({
      next: () => this.router.navigateByUrl(this.retour || '/mes-inscriptions'),
      error: () =>
        this.erreur.set('Connexion établie, mais vos inscriptions sont inaccessibles (API arrêtée ?).'),
    });
  }
}
