interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
    return (
        <a className='relative rounded-lg overflow-hidden' href="">
            <img src={props.bannerUrl} alt={props.title} />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'> {props.title} </strong>
                {props.adsCount === 1 ?
                    <span className='text-zinc-300 text-sm block'>{props.adsCount} Anúncio</span>
                    :
                    <span className='text-zinc-300 text-sm block'>{props.adsCount} Anúncios</span>
                }
            </div>
        </a>
    )
}