import { Component, EventEmitter, OnInit, Output, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Cours } from '../../models/cours';
import { Catalogue } from '../../services/catalogue';
import { FiltreCoursPipe } from '../../pipes/filtre-cours';
import { TriCoursPipe } from '../../pipes/tri-cours';

@Component({
  imports: [FormsModule, RouterLink, UpperCasePipe, FiltreCoursPipe, TriCoursPipe],
  selector: 'app-liste-cours',
  styleUrl: './liste-cours.css',
  templateUrl: './liste-cours.html',
})
export class ListeCours implements OnInit {
  private catalogue = inject(Catalogue);
  @Output() coursSelectionne = new EventEmitter<Cours>();

  recherche = '';
  tri: 'asc' | 'desc' = 'asc';
  coursActif: Cours | null = null;

  cours = signal<Cours[]>([]);
  chargement = signal(true);
  erreur = signal('');

  ngOnInit() {
    this.catalogue.lister().subscribe({
      next: (liste) => {
        this.cours.set(liste);
        this.chargement.set(false);
      },
      error: () => {
        this.erreur.set("Impossible de charger les cours. L'API est-elle démarrée ?");
        this.chargement.set(false);
      },
    });
  }

  selectionner(c: Cours) {
    this.coursActif = c;
    this.coursSelectionne.emit(c);
  }
}
