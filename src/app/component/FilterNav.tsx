import { type ChangeEvent } from 'react'
import { useStore } from '../Store/store'
import { GENRE } from '../types'

interface Prop {
  fav: number
  total: number
}
export default function FilterNav ({ fav, total }: Prop) {
  const { genre, setGenre, favState, setFavState } = useStore()
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value as (typeof GENRE)[keyof typeof GENRE])
  }
  const handleBook = async (book: (typeof GENRE)[keyof typeof GENRE]) => {
    const newFav = book === GENRE.FAV ? !favState : false
    setFavState(newFav)
  }
  return (
    <nav className="flex items-center justify-between border-2 border-slate-500 rounded-lg sticky top-2 z-10 backdrop-blur-md bg-black/50">
      <div>
        <select
          className="items-end py-2"
          value={genre}
          onChange={handleSelect}
        >
          <option value={GENRE.TODOS}>Todos</option>
          <option value={GENRE.TERROR}>Terror</option>
          <option value={GENRE.FANTASIA}>Fantasia</option>
          <option value={GENRE.ZOOMBIES}>Zombie</option>
          <option value={GENRE.CIENCIAFICCION}>Ciencia ficcion</option>
        </select>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              void handleBook(GENRE.FAV)
            }}
            className={`hover:underline ${favState ? 'text-yellow-400' : ''}`}
          >
            Fav:
          </button>
          <p className="bg-yellow-300 w-8 h-8 text-xl rounded-full text-center text-slate-950">
            {fav}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button className='hover:underline' onClick={async () => { await handleBook(GENRE.TODOS) }}>
            Total:
          </button>
          <p className="bg-indigo-300 w-8 h-8 text-xl rounded-full text-center text-slate-950">
            {total}
          </p>
        </div>
      </div>
    </nav>
  )
}
