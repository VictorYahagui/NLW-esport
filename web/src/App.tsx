import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAtBanner } from './components/CreateAtBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface Games {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number,
  }

}

function App() {
  const [games, setGames] = useState<Games[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data);
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black ">Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> esta aqui </h1>
      {!games ?
        <div className='text-white mt-16 mb-10'> Carregando . . . </div>
        :
        <div className='grid grid-cols-6 gap-6 mt-16 '>
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
                title={game.title}
              />
            )
          })}
        </div>
      }
      <Dialog.Root>
        <CreateAtBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
