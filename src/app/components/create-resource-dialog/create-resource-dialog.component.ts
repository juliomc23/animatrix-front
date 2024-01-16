import { NgClass } from '@angular/common';
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnimeResponse } from '../../views/animes/interfaces/anime.interface';
import { AnimesService } from '../../views/animes/services/animes.service';
import { Manga } from '../../views/mangas/interfaces/manga.interface';
import { MangasService } from '../../views/mangas/services/mangas.service';

type MangaFormGroup = {
  name: FormControl<string>;
  chapter: FormControl<any>;
  chapterPage: FormControl<any>;
  nextChapter: FormControl<null>;
  comment: FormControl<null>;
  url: FormControl<string>;
};

@Component({
  selector: 'app-create-resource-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './create-resource-dialog.component.html',
  styleUrl: './create-resource-dialog.component.css',
})
export class CreateResourceDialogComponent implements OnInit {
  @Input({ required: true }) resourceType!: 'anime' | 'manga';
  $resourceModalOpen = signal<boolean>(false);
  resourceFormGroup!: FormGroup;

  private mangasService = inject(MangasService);
  private animesService = inject(AnimesService);

  ngOnInit(): void {
    this.asignFormGroup();
  }

  createResource() {
    if (this.resourceType === 'manga') {
      const newManga = this.getMangaFormValues();
      this.mangasService.createManga(newManga).subscribe({
        next: (res) => {
          this.mangasService.setNewManga(res);
        },
      });
    }

    if (this.resourceType === 'anime') {
      const newAnime = this.getAnimeFormValues();
      this.animesService.createAnimeSubscription(newAnime).subscribe({
        next: (res) => this.animesService.setNewAnime(res),
      });
    }

    this.resourceFormGroup.reset();
  }

  closeModal() {
    this.$resourceModalOpen.set(false);
  }

  openModal() {
    this.$resourceModalOpen.set(true);
  }

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
}
