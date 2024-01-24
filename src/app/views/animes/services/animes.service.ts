import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { AnimeResponse } from '../interfaces/anime.interface';

@Injectable({
  providedIn: 'root',
})
export class AnimesService {
  constructor(
    private readonly httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  $animes = signal<AnimeResponse[]>([]);

  getAnimesSubscription() {
    return this.httpClient.get<AnimeResponse[]>('http://localhost:3000/anime', {
      headers: {
        Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
      },
    });
  }

  getSingleAnimeSubscription(id: number) {
    return this.httpClient.get<AnimeResponse>(
      `http://localhost:3000/anime/${id}`,
      {
        headers: {
          Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
        },
      }
    );
  }

  createAnimeSubscription(anime: Partial<AnimeResponse>) {
    return this.httpClient.post<AnimeResponse>(
      'http://localhost:3000/anime',
      anime,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
        },
      }
    );
  }

  deleteAnimeSubscription(id: number) {
    return this.httpClient.delete(`http://localhost:3000/anime/${id}`, {
      headers: {
        Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
      },
    });
  }

  editAnimeSubscription(id: number, anime: Partial<AnimeResponse>) {
    return this.httpClient.patch<AnimeResponse>(
      `http://localhost:3000/anime/${id}`,
      anime,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.tokenService.getAccessToken()}`,
        },
      }
    );
  }

  getAnimes() {
    return this.$animes;
  }

  setAnimes(animes: AnimeResponse[]) {
    this.$animes.set(animes);
  }

  setEditedAnime(anime: AnimeResponse) {
    this.$animes.update((animes) => {
      const index = animes.findIndex((a) => a.id === anime.id);
      if (index !== -1) {
        animes[index] = anime;
      }
      return animes;
    });
  }

  setNewAnime(anime: AnimeResponse) {
    this.$animes.update((animes) => [...animes, anime]);
  }

  deleteAnime(id: number) {
    this.$animes.update((animes) => animes.filter((anime) => anime.id !== id));
  }
}
