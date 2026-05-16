export interface Post {
  slug:     string;
  title:    string;
  date:     string;    // ISO: '2025-04-10'
  tag:      string;
  excerpt:  string;
  body:     string;    // HTML
  readTime: number;    // минуты
  image?:   string;   // cover image URL
}
