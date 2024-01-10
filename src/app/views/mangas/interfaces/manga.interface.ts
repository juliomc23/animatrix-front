export interface Manga {
  name: string;
  chapter: number;
  chapterPage: number;
  nextChapter?: number | null;
  url: string;
  comment?: string | null;
}
