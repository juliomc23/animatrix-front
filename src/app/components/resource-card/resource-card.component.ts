import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { Manga } from '../../views/mangas/interfaces/manga.interface';
import { AnimeResponse } from '../../views/animes/interfaces/anime.interface';
import { AnimesService } from '../../views/animes/services/animes.service';
import { MangasService } from '../../views/mangas/services/mangas.service';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css',
})
export class ResourceCardComponent {
  @Input({ required: true }) resourceType!: 'manga' | 'anime';
  @Input() mangaResource!: Manga;
  @Input() animeResource!: AnimeResponse;

  private animesService = inject(AnimesService);
  private mangasService = inject(MangasService);

  getResourceUrl(resourceType: 'manga' | 'anime') {
    return resourceType === 'anime'
      ? this.animeResource.url
      : this.mangaResource.url;
  }

  getLinkText(resourceType: 'manga' | 'anime') {
    return resourceType === 'anime'
      ? 'Watch Anime Episode'
      : 'Read Manga Chapter';
  }

  deleteResource(id: number) {
    if (this.resourceType === 'anime') {
      this.animesService.deleteAnimeSubscription(id).subscribe({
        next: () => this.animesService.deleteAnime(id),
      });
    }

    if (this.resourceType === 'manga') {
      this.mangasService.deleteMangaSubscription(id).subscribe({
        next: () => this.mangasService.deleteManga(id),
      });
    }
  }
}
