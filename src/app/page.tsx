import Loading from './loading'
import dynamic from 'next/dynamic'
const IndexHomePage = dynamic(async () => await import('./client'), { ssr: false, loading: Loading })

export default async function Home () {
  return (
      <IndexHomePage/>
  )
}
