import {
  Component,
  Input,
  OnChanges,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnimeResponse } from '../../views/animes/interfaces/anime.interface';
import { AnimesService } from '../../views/animes/services/animes.service';
import { Manga } from '../../views/mangas/interfaces/manga.interface';
import { MangasService } from '../../views/mangas/services/mangas.service';
import { NgClass } from '@angular/common';

type MangaFormGroup = {
  name: FormControl<string>;
  chapter: FormControl<any>;
  chapterPage: FormControl<any>;
  nextChapter: FormControl<null>;
  comment: FormControl<null>;
  url: FormControl<string>;
};

@Component({
  selector: 'app-edit-resource-dialog',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './edit-resource-dialog.component.html',
  styleUrl: './edit-resource-dialog.component.css',
})
export class EditResourceDialogComponent implements OnInit, OnChanges {
  @Input({ required: true }) resourceType!: 'anime' | 'manga';
  @Input({ required: true }) $resourceModalOpen = signal<boolean>(false);
  @Input({ required: true }) resourceId!: number;

  private mangasService = inject(MangasService);
  private animesService = inject(AnimesService);

  resourceFormGroup!: FormGroup;

  private asignFormGroup(): void {
    if (this.resourceType === 'anime')
      this.resourceFormGroup = new FormGroup({
        name: new FormControl(),
        episode: new FormControl(),
        episodeMinute: new FormControl(),
        nextEpisode: new FormControl(null),
        url: new FormControl(),
        comment: new FormControl(null),
      });

    if (this.resourceType === 'manga')
      this.resourceFormGroup = new FormGroup<MangaFormGroup>({
        name: new FormControl(),
        chapter: new FormControl(),
        chapterPage: new FormControl(),
        nextChapter: new FormControl(null),
        comment: new FormControl(null),
        url: new FormControl(),
      });
  }

  private getMangaFormValues() {
    const manga: Manga = this.resourceFormGroup.value;

    const newManga = {
      name: manga.name ?? '',
      chapter: manga.chapter ?? 0,
      chapterPage: manga.chapterPage ?? 0,
      nextChapter: manga.nextChapter,
      comment: manga.comment,
      url: this.checkUrl(manga.url),
    };

    return newManga;
  }

  private getAnimeFormValues() {
    const anime: AnimeResponse = this.resourceFormGroup.value;
    const newAnime = {
      name: anime.name ?? '',
      episode: anime.episode ?? 0,
      episodeMinute: anime.episodeMinute ?? 0,
      nextEpisode: anime.nextEpisode,
      comment: anime.comment,
      url: this.checkUrl(anime.url),
    };

    return newAnime;
  }

  private checkUrl(url: string) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }

  ngOnInit(): void {
    this.asignFormGroup();
  }

  ngOnChanges() {
    this.getSingleResource(this.resourceType, this.resourceId);
  }

  editResource() {
    if (this.resourceType === 'manga') {
      const newManga = this.getMangaFormValues();
      this.mangasService
        .editMangaSubscription(this.resourceId, newManga)
        .subscribe({
          next: (res) => {
            this.mangasService.setEditedManga(res);
          },
        });
    }

    if (this.resourceType === 'anime') {
      const newAnime = this.getAnimeFormValues();
      this.animesService
        .editAnimeSubscription(this.resourceId, newAnime)
        .subscribe({
          next: (res) => this.animesService.setEditedAnime(res),
        });
    }

    this.resourceFormGroup.reset();
  }

  closeModal() {
    this.$resourceModalOpen.set(false);
  }

  getSingleResource(resourceType: 'anime' | 'manga', id: number) {
    if (resourceType === 'anime' && this.resourceId) {
      this.animesService.getSingleAnimeSubscription(id).subscribe({
        next: (res) => {
          this.resourceFormGroup.setValue({
            name: res.name,
            episode: res.episode,
            episodeMinute: res.episodeMinute,
            nextEpisode: res.nextEpisode ?? null,
            url: res.url,
            comment: res.comment ?? null,
          });
        },
      });
    }

    if (resourceType === 'manga' && this.resourceId) {
      this.mangasService.getSingleMangaSubscription(id).subscribe({
        next: (res) => {
          this.resourceFormGroup.setValue({
            name: res.name,
            chapter: res.chapter,
            chapterPage: res.chapterPage,
            nextChapter: res.nextChapter ?? null,
            url: res.url,
            comment: res.comment ?? null,
          });
        },
      });
    }
  }
}
