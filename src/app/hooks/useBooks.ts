import { useState } from '../Store/store'

export default function useBooks () {
  const { books, readList, setBooks, setReadList } = useState(state => state)
  return {
    libros: books,
    newreadlist: readList,
    setBooks,
    newSetReadList: setReadList
  }
}
