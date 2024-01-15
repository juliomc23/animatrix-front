import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { AnimeResponse } from '../interfaces/anime.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  constructor(private readonly httpClient: HttpClient) {}

  $animes = signal<AnimeResponse[]>([]);

  getAnimesSubscription() {
    return this.httpClient.get<AnimeResponse[]>('http://localhost:3000/anime');
  }

  getAnimes() {
    return this.$animes;
  }

  setAnimes(animes: AnimeResponse[]) {
    this.$animes.set(animes);
  }
}
