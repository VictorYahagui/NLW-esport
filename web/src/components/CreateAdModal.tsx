import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroupUI from '@radix-ui/react-toggle-group'
import * as Select from '@radix-ui/react-select'
import { CaretDown, Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'


interface Games {
    id: string,
    title: string,
}

export function CreateAdModal() {
    const [games, setGames] = useState<Games[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);
    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data);
            })
    }, [])
    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData)
        console.log(data.game);
        try {
            axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": useVoiceChannel
            });
            alert('Anúncio criado');
        } catch (err) {
            alert('erro ao criar anúncio');
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#121214] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black '>
                    Publique um anúncio
                </Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'> Qual o jogo ?</label>
                        <Select.Root name='game'>
                            {!games ?
                                <Select.Trigger disabled className='flex justify-center bg-zinc-900 py-3 px-4 rounded text-sm'>
                                    <Select.Value placeholder='Carregando lista de jogos...'>
                                    </Select.Value>
                                </Select.Trigger>
                                :
                                <Select.Trigger className='flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm'>
                                    <Select.Value className='' placeholder='Selecione o jogo'>
                                    </Select.Value>
                                    <Select.Icon>
                                        <CaretDown size={24} />
                                    </Select.Icon>
                                </Select.Trigger>
                            }
                            <Select.Portal id='game'>
                                <Select.Content className='rounded-md bg-zinc-900 px-2'>
                                    <Select.Viewport>
                                        <Select.Group >
                                            <Select.Label className='flex justify-center font-semibold mt-1'> Jogos </Select.Label>
                                            <Select.Separator className='h-[1px] bg-nlw-gradient rounded-md mx-1.5 my-1' />
                                            {games.map(game => {
                                                return (
                                                    <Select.Item className='relative flex items-center px-2 hover:bg-violet-500 hover:rounded' key={game.id} value={game.title}>
                                                        <Select.ItemIndicator className='absolute inset-0 w-full px-2 bg-violet-600 rounded'>
                                                            {game.title}
                                                        </Select.ItemIndicator>
                                                        <Select.ItemText>
                                                            {game.title}
                                                        </Select.ItemText>
                                                    </Select.Item>
                                                )
                                            })}
                                        </Select.Group>
                                        <Select.Separator />
                                    </Select.Viewport>
                                </Select.Content>
                            </Select.Portal>
                        </Select.Root>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='name' className='font-semibold'>Seu nome (ou NickName)</label>
                        <Input name='name' id='name' placeholder='Como te chamam no jogo' />
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying" className='font-semibold'>Joga a quanto tempo ?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type='number' placeholder='Tudo bem ser zero' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord" className='font-semibold'>Qual seu discord ?</label>
                            <Input name='discord' id='discord' placeholder='User#0000' />
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar ?</label>
                            <div>
                                <ToggleGroupUI.Root
                                    type='multiple'
                                    className='grid grid-cols-4 gap-2'
                                    onValueChange={setWeekDays}
                                    value={weekDays}
                                    aria-label='Dias da semana'
                                >
                                    <ToggleGroupUI.ToggleGroupItem
                                        value="0"
                                        aria-label='Domingo'
                                        title='Domingo'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        D
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="1"
                                        aria-label='Segunda-Feira'
                                        title='Segunda-Feira'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="2"
                                        aria-label='Terça-Feira'
                                        title='Terça-Feira'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        T
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="3"
                                        aria-label='Quarta-Feira'
                                        title='Quarta-Feira'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        Q
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="4"
                                        title='Quinta-Feira'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        Q
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="5"
                                        title='Sexta-Feira'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroupUI.ToggleGroupItem>

                                    <ToggleGroupUI.ToggleGroupItem
                                        value="6"
                                        title='Sábado'
                                        className={`w-8 h-8 rounded ${weekDays?.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>
                                        S
                                    </ToggleGroupUI.ToggleGroupItem>
                                </ToggleGroupUI.Root>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart" className='font-semibold'>Qual horario do dia ?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' type="time" id='hourStart' placeholder='De' />
                                <Input name='hourEnd' type="time" id='hourEnd' placeholder='Até' />
                            </div>
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 text-sm items-center font-semibold'>
                        <Checkbox.Root
                            name='voice'
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => { checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false) }}
                            className='w-6 h-6 p-1 rounded bg-zinc-900'>
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400'></Check>
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao voice
                    </label>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600' type='button'>Cancelar</Dialog.Close>
                        <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type='submit'>
                            <GameController size={24} />
                            Encontar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}