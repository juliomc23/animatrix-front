import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Manga } from '../interfaces/manga.interface';
import { TokenService } from '../../../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class MangasService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  private $mangas: WritableSignal<Manga[]> = signal<Manga[]>([]);

  getMangasSusbcription() {
    return this.httpClient.get<Manga[]>('http://localhost:3000/manga');
  }

  createManga(manga: Partial<Manga>) {
    return this.httpClient.post<Manga>('http://localhost:3000/manga', manga, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
      },
    });
  }

  getMangas() {
    return this.$mangas;
  }

  setMangas(mangas: Manga[]) {
    this.$mangas.set(mangas);
  }

  setNewManga(manga: Manga) {
    this.$mangas.update((mangas) => [...mangas, manga]);
  }
}
