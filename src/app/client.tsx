'use client'
import { useEffect, useMemo, useRef } from 'react'
import { GENRE, type Book } from './types'
import Books from './component/Books'
import { useStore } from './Store/store'
import { GetAllBook } from './Services/GetBook'
import FilterNav from './component/FilterNav'

export default function IndexHomePage () {
  const { books, setReadList, setBooks, genre, readList } = useStore()

  useEffect(() => {
    void GetAllBook().then(newBooks => {
      setBooks(newBooks)
    })
    const newBook = new Set<Book['ISBN']>(JSON.parse(window.localStorage.getItem('readList') ?? '[]'))
    setReadList(newBook)
    addEventListener('storage', (e) => {
      if (e.key === 'readList') {
        const newBook = new Set<Book['ISBN']>(JSON.parse(window.localStorage.getItem('readList') ?? '[]'))
        setReadList(newBook)
      }
    })
    return () => {
      removeEventListener('storage', (e) => {
        if (e.key === 'readList') {
          const newBook = new Set<Book['ISBN']>(JSON.parse(window.localStorage.getItem('readList') ?? '[]'))
          setReadList(newBook)
        }
      })
    }
  }, [])
  const total = useRef(0)
  const matches = useMemo(() => {
    total.current = genre !== GENRE.FAV ? total.current = 0 : total.current
    return books.filter(book => {
      if (!genre) {
        total.current++
        return true
      }
      if (genre === GENRE.FAV) {
        return readList instanceof Set && readList.has(book.ISBN)
      }
      if (book.genre !== genre) {
        return false
      }
      total.current++
      return true
    })
  }, [genre])

  return (
    <article className='flex flex-col gap-4 mt-5'>
      <FilterNav fav={readList.size} total={total.current}/>
      <Books matches={matches}/>
  </article>
  )
}
