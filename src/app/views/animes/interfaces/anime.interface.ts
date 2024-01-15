export interface AnimeResponse {
  id: number;
  name: string;
  episode: number;
  episodeMinute: number;
  nextEpisode?: number;
  url: string;
  comment?: string;
}
