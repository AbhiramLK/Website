export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  body: string;
  meta: {
    description: string;
    keywords: string[];
  };
}
