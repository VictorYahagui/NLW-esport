import * as Dialog from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAtBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8'>
            <div className='bg-[#2a2634] px-7 py-5 flex items-center justify-between'>
                <div>
                    <strong className='text-2xl  text-white font-black block'>
                        Não encontrou seu duo?
                    </strong>
                    <span className='text-base font-[400] text-zinc-400 block'>
                        Publique um anúncio para encontrar novos players!
                    </span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 rounded-md hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Publicar anúncio
                </Dialog.Trigger>
            </div>
        </div>
    )
}