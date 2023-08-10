import { create } from 'zustand'
import { GENRE, type Book } from '../types'
import { devtools, persist } from 'zustand/middleware'

interface Store {
  favState: boolean
  setFavState: (newFav: boolean) => void
  genre: typeof GENRE[keyof typeof GENRE]
  setGenre: (newGenre: typeof GENRE[keyof typeof GENRE]) => void
  readList: Set<Book['ISBN']>
  books: Book[]
  setBooks: (newBooks: Book[]) => void
  setReadList: (newBook: Set<Book['ISBN']>) => void
}

export const useStore = create<Store>()(
  devtools(
    persist((set, get) => {
      return {
        favState: false,
        setFavState: (newFav) => {
          set({ favState: newFav })
        },
        readList: new Set(''),
        books: [],
        genre: GENRE.TODOS,
        setGenre: (newGenre: typeof GENRE[keyof typeof GENRE]) => {
          set({ genre: newGenre })
        },
        setBooks: (newBooks) => {
          set({ books: newBooks })
        },
        setReadList: (newBook) => {
          set({ readList: new Set(newBook) })
        }
      }
    }, {
      name: 'Store'
    })))
