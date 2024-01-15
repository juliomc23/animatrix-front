import { Component, WritableSignal, effect, inject } from '@angular/core';
import { Manga } from '../mangas/interfaces/manga.interface';
import { MangasService } from '../mangas/services/mangas.service';
import { MangaCardComponent } from '../mangas/components/manga-card/manga-card.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MangaCardComponent, SlicePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private mangasService = inject(MangasService);

  $mangas: WritableSignal<Manga[]> = this.mangasService.getMangas();

  constructor() {
    effect(() => {
      this.getMangas();
    });
  }

  ngOnInit(): void {
    this.getMangasSubscription();
  }

  getMangasSubscription() {
    this.mangasService.getMangasSusbcription().subscribe({
      next: (mangas) => {
        this.mangasService.setMangas(mangas);
      },
      error: (err) => console.log(err),
    });
  }

  getMangas() {
    this.$mangas = this.mangasService.getMangas();
  }
}
