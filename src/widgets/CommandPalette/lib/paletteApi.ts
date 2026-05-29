export interface PaletteSearchPost {
  slug: string;
  title: string;
  tag: string;
}

export const fetchPalettePosts = async (): Promise<PaletteSearchPost[]> => {
  try {
    const response = await fetch('/api/posts/list');
    if (!response.ok) {
      return [];
    }

    return (await response.json()) as PaletteSearchPost[];
  } catch {
    return [];
  }
};
