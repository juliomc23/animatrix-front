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
  $counter: WritableSignal<number> = signal<number>(0);

  getMangasSusbcription() {
    return this.httpClient.get<Manga[]>('http://localhost:3000/manga');
  }

  createManga(manga: Manga) {
    return this.httpClient.post<Manga>('http://localhost:3000/manga', manga, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
      },
    });
  }

  add() {
    this.$counter.update((c) => c + 1);
  }

  substract() {
    this.$counter.update((c) => c - 1);
  }

  // setMangas(mangas: Manga[]) {
  //   this.$mangas.set(mangas);
  // }

  // setNewManga(manga: Manga) {
  //   this.$mangas.update((mangas) => [...mangas, manga]);
  // }

  // getMangas() {
  //   return this.$mangas();
  // }
}
