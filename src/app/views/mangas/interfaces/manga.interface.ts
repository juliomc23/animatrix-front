export interface Manga {
  id: number;
  name: string;
  chapter: number;
  chapterPage: number;
  nextChapter?: number | null;
  url: string;
  comment?: string | null;
}
