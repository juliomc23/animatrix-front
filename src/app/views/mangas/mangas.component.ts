import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { MangasService } from './services/mangas.service';
import { Manga } from './interfaces/manga.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mangas.component.html',
  styleUrl: './mangas.component.css',
})
export class MangasComponent implements OnInit {
  private mangasService = inject(MangasService);
  $mangas: WritableSignal<Manga[]> = signal([]);

  $newMangaModalOpen = signal(false);

  newMangaFormGroup = new FormGroup({
    name: new FormControl(''),
    chapter: new FormControl(),
    chapterPage: new FormControl(),
    nextChapter: new FormControl(null),
    url: new FormControl(''),
    comment: new FormControl(null),
  });

  ngOnInit(): void {
    this.getMangas();
  }

  handleOpenNewMangaModal() {
    if (!this.$newMangaModalOpen()) {
      this.$newMangaModalOpen.set(true);
    } else {
      this.$newMangaModalOpen.set(false);
    }
  }

  createNewManga() {
    const manga = this.newMangaFormGroup.value;
    const newManga = {
      name: manga.name ?? '',
      chapter: manga.chapter ?? 1,
      chapterPage: manga.chapterPage ?? 1,
      nextChapter: manga.nextChapter,
      url: manga.url ?? '',
      comment: manga.comment,
    };

    this.mangasService.createManga(newManga).subscribe({
      next: () => {
        this.getMangas();
        this.newMangaFormGroup.reset();
      },
      error: (err) => console.log(err),
    });
  }

  getMangas() {
    this.mangasService
      .getMangas()
      .subscribe({ next: (res) => this.$mangas.set(res) });
  }
}
