import { CurrentlyPlaying } from "../types";

interface Props {
    currentTrack: CurrentlyPlaying;
    onSelectTimePeriod: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const DataCards = ({ currentTrack, onSelectTimePeriod }: Props) => {
    return (
        <div 
            className='w-full h-1/3 flex
            items-center justify-center mt-10'
        >
            <div
                className='w-1/3 h-1/3 align-middle
                items-center justify-center'
            >
                <div 
                    className='w-3/4 flex justify-center 
                    items-center bg-card_gray ml-16 rounded-lg'
                >
                    <span
                        className='text-white text-center
                        font-semibold text-2xl mt-6'
                    >
                        Currently Listening
                        <p
                            className='text-white text-center break-words
                            font-semibold text-xl tracking-widest mt-6 mb-6'
                        >
                            { currentTrack.item.name } by { currentTrack.item.artists[0].name }
                        </p>
                    </span>
                    
                </div>
            </div>

            <div
                className='w-1/3 h-1/3'
            >
                <div 
                    className='w-3/4 block justify-center 
                    items-center ml-16'
                >
                    <div className='flex justify-center items-center'>
                        <span
                            className='text-white text-center
                            font-semibold text-2xl'
                        >
                            Time Period
                        </span>
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <select 
                            onChange={ onSelectTimePeriod }
                            className='bg-slate-600 text-white h-10 w-48 p-1'
                            defaultValue={'medium_term'}
                        >
                            <option value='short_term'>Last Month</option>
                            <option value='medium_term'>Last Six Months</option>
                            <option value='long_term'>All Time</option>
                        </select>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};


