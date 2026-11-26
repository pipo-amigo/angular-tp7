import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cours } from '../../models/cours';
import { Session } from '../../services/session';
import { Catalogue } from '../../services/catalogue';
import { Inscriptions } from '../../services/inscriptions';

@Component({
  selector: 'app-mes-inscriptions',
  imports: [DatePipe, RouterLink],
  templateUrl: './mes-inscriptions.html',
  styleUrl: './mes-inscriptions.css',
})
export class MesInscriptions implements OnInit {
  session = inject(Session);
  private catalogue = inject(Catalogue);
  inscriptions = inject(Inscriptions);

  cours = signal<Cours[]>([]);
  erreur = signal('');
  niveaux = [
    { valeur: 'debutant', libelle: 'Débutant' },
    { valeur: 'intermediaire', libelle: 'Intermédiaire' },
    { valeur: 'avance', libelle: 'Avancé' },
  ];

  ngOnInit() {
    this.catalogue.lister().subscribe({
      next: (l) => this.cours.set(l),
      error: () => this.erreur.set('Impossible de charger les cours.'),
    });
  }

  titre(coursId: number): string {
    return this.cours().find((c) => c.id === coursId)?.titre ?? 'Cours inconnu';
  }

  annuler(id: number) {
    this.inscriptions.annuler(id).subscribe({
      error: () => this.erreur.set("L'annulation a échoué."),
    });
  }

  changerNiveau(id: number, niveau: string) {
    this.inscriptions.modifierNiveau(id, niveau).subscribe({
      error: () => this.erreur.set('La modification a échoué.'),
    });
  }
}
