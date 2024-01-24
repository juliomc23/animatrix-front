import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateResourceDialogComponent } from '../../components/create-resource-dialog/create-resource-dialog.component';
import { ResourceCardComponent } from '../../components/resource-card/resource-card.component';
import { Manga } from './interfaces/manga.interface';
import { MangasService } from './services/mangas.service';

@Component({
  selector: 'app-mangas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CreateResourceDialogComponent,
    ResourceCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mangas.component.html',
  styleUrl: './mangas.component.css',
})
export class MangasComponent {
  private mangasService = inject(MangasService);

  $mangas: WritableSignal<Manga[]> = this.mangasService.getMangas();
  $resourceModalOpen = signal<boolean>(false);

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

  openModal() {
    this.$resourceModalOpen.set(true);
  }
}
