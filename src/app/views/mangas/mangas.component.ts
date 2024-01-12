import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMangaDialogComponent } from './components/create-manga-dialog/create-manga-dialog.component';
import { MangaCardComponent } from './components/manga-card/manga-card.component';
import { Manga } from './interfaces/manga.interface';
import { MangasService } from './services/mangas.service';

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MangaCardComponent,
    CreateMangaDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mangas.component.html',
  styleUrl: './mangas.component.css',
})
export class MangasComponent {
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
