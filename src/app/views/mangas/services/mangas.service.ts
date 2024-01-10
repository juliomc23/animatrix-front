import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getMangas() {
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
}
