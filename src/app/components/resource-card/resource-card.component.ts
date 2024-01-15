import { Component, Input } from '@angular/core';
import { Manga } from '../../views/mangas/interfaces/manga.interface';
import { AnimeResponse } from '../../views/animes/interfaces/anime.interface';

@Component({
  selector: 'app-resource-card',
  standalone: true,
  imports: [],
  templateUrl: './resource-card.component.html',
  styleUrl: './resource-card.component.css',
})
export class ResourceCardComponent {
  @Input({ required: true }) resourceType!: 'manga' | 'anime';
  @Input() mangaResource!: Manga;
  @Input() animeResource!: AnimeResponse;
}
