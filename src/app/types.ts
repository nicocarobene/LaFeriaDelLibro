export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: {
    name: string
    otherBooks: string[]
  }
}

export enum GENRE {
  FANTASIA = 'Fantasía',
  CIENCIAFICCION = 'Ciencia ficción',
  ZOOMBIES = 'Zombies',
  TERROR = 'Terror',
  FAV = 'favs',
  TODOS = ''
}
