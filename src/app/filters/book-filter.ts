export class BookFilter {
  name: string;
  author: string;
  category: string


  constructor(name: string, author: string, category: string) {
    this.name = name;
    this.author = author;
    this.category = category;
  }
}
