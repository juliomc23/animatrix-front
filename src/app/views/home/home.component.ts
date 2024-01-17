import { SlicePipe } from '@angular/common';
import { Component, WritableSignal, effect, inject } from '@angular/core';
import { ResourceCardComponent } from '../../components/resource-card/resource-card.component';
import { Manga } from '../mangas/interfaces/manga.interface';
import { MangasService } from '../mangas/services/mangas.service';
import { AnimesService } from '../animes/services/animes.service';
import { AnimeResponse } from '../animes/interfaces/anime.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ResourceCardComponent, SlicePipe, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private mangasService = inject(MangasService);
  private animesService = inject(AnimesService);

  $mangas: WritableSignal<Manga[]> = this.mangasService.getMangas();
  $animes: WritableSignal<AnimeResponse[]> = this.animesService.getAnimes();

  private route = inject(ActivatedRoute);
  private routerService = inject(RouterService);

  constructor() {
    effect(() => {
      this.getMangas();
      this.getAnimes();
    });
  }

  ngOnInit(): void {
    this.getActualRoute();
    this.getMangasSubscription();
    this.getAnimesSubscription();
  }
  getActualRoute() {
    this.route.url.subscribe(([url]) => {
      const { path } = url;
      this.routerService.setRoute(path);
    });
  }

  getMangasSubscription() {
    this.mangasService.getMangasSusbcription().subscribe({
      next: (mangas) => {
        this.mangasService.setMangas(mangas);
      },
      error: (err) => console.log(err),
    });
  }

  getAnimesSubscription() {
    this.animesService.getAnimesSubscription().subscribe({
      next: (animes) => {
        this.animesService.setAnimes(animes);
      },
    });
  }

  getMangas() {
    this.$mangas = this.mangasService.getMangas();
  }

  getAnimes() {
    this.$animes = this.animesService.getAnimes();
  }
}
