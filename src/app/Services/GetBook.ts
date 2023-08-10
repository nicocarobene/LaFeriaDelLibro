import { type Book } from '../types'

export async function GetAllBook () {
  return await new Promise<Book[]>(resolve => {
    setTimeout(async () => {
      const books: Book[] = await import('../book.json').then(data => data.library.map(book => book.book))
      resolve(books)
    }, 0)
  })
}

interface Prop {
  ids: Array<Book['ISBN']>
}

export async function GetBookIds ({ ids }: Prop) {
  console.log(ids)
  return await new Promise<Book[]>(resolve => {
    setTimeout(async () => {
      const books: Book[] = await import('../book.json').then(data => data.library.map(book => book.book))
      const favBook = books.filter(book => ids.includes(book.ISBN))
      resolve(favBook)
    }, 0)
  })
}
