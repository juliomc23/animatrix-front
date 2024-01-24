import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
  signal,
} from '@angular/core';
import { AnimeResponse } from '../../views/animes/interfaces/anime.interface';
import { AnimesService } from '../../views/animes/services/animes.service';
import { Manga } from '../../views/mangas/interfaces/manga.interface';
import { MangasService } from '../../views/mangas/services/mangas.service';
import { EditResourceDialogComponent } from '../edit-resource-dialog/edit-resource-dialog.component';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [EditResourceDialogComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css',
})
export class ResourceCardComponent {
  @Input({ required: true }) resourceType!: 'manga' | 'anime';
  @Input() mangaResource!: Manga;
  @Input() animeResource!: AnimeResponse;

  resourceId!: number;

  private animesService = inject(AnimesService);
  private mangasService = inject(MangasService);

  $resourceModalOpen = signal<boolean>(false);

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

  manageResource(id: number, editOrDelete: 'edit' | 'delete') {
    if (editOrDelete === 'edit') {
      this.editResource(id);
    }

    if (editOrDelete === 'delete') {
      this.deleteResource(id);
    }
  }

  private editResource(id: number) {
    this.$resourceModalOpen.set(true);
    if (this.resourceType === 'anime') {
      this.resourceId = id;
      //TODO: edit anime
    }

    if (this.resourceType === 'manga') {
      //TODO: edit manga
      this.resourceId = id;
    }
  }

  private deleteResource(id: number) {
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
