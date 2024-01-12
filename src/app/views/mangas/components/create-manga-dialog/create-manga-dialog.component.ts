import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MangasService } from '../../services/mangas.service';

@Component({
  selector: 'app-create-manga-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-manga-dialog.component.html',
  styleUrl: './create-manga-dialog.component.css',
})
export class CreateMangaDialogComponent {
  private mangasService = inject(MangasService);

  $newMangaModalOpen = signal(false);

  newMangaFormGroup = new FormGroup({
    name: new FormControl(''),
    chapter: new FormControl(),
    chapterPage: new FormControl(),
    nextChapter: new FormControl(null),
    url: new FormControl(''),
    comment: new FormControl(null),
  });

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
        this.mangasService.setNewManga(newManga);
        this.newMangaFormGroup.reset();
      },
      error: (err) => console.log(err),
    });
  }
}
