import { Component, Input } from '@angular/core';
import { Manga } from '../../interfaces/manga.interface';

@Component({
  selector: 'app-manga-card',
  standalone: true,
  imports: [],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.css',
})
export class MangaCardComponent {
  @Input({ required: true }) manga!: Manga;
}
