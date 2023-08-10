'use client'
import { useStore } from '../Store/store'
import { type Book } from '../types'

interface Prop {
  matches: Book[]
}

export default function Books ({ matches }: Prop) {
  const { favState, readList } = useStore()
  return (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {matches?.map((book) => {
          return favState
            ? readList instanceof Set && readList.has(book.ISBN) && <BookItem ISBN={book.ISBN} cover={book.cover} title={book.title} key={book.ISBN}/>
            : <BookItem ISBN={book.ISBN} cover={book.cover} title={book.title} key={book.ISBN}/>
        }
        )}
      </ul>
  )
}

interface PropBook {
  ISBN: Book['ISBN']
  cover: Book['cover']
  title: Book['title']
}
const BookItem = ({
  ISBN,
  cover,
  title
}: PropBook) => {
  const { favState, setReadList, readList } = useStore()
  const handleReadList = (id: Book['ISBN']) => {
    const newBook = structuredClone(readList)
    newBook.has(id) ? newBook.delete(id) : newBook.add(id)
    setReadList(newBook)
    localStorage.setItem('readList', JSON.stringify(Array.from(newBook)))
  }
  return (
    <li
    key={ISBN}
    className="relative"
    onClick={() => { handleReadList(ISBN) }}
    >
    <img
      className="w-[314px] h-[488px] object-cover"
      src={cover}
      alt={title}
      />
    {readList instanceof Set && readList.has(ISBN)
      ? (
       <span className="backdrop-blur-sm bg-gray-500/50 rounded-full m-3 p-3 text-2xl absolute top-0 left-0">
            ⭐
        </span>
        )
      : null}
    <p>{title}</p>
  </li>
  )
}
