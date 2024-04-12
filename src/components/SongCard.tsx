
interface Props {
    songName: string;
    artistName: string;
    url: string;
    imgSrc: string;
}

export const SongCard = ({ artistName, songName, url, imgSrc }: Props) => {
    const name = songName.length > 10 ? songName.slice(0, 10) + '...' : songName;

    return (
        <div
            className='w-64 h-64 flex justify-center mr-10 mt-5
            align-middle items-center bg-card_gray rounded-2xl'
        >
            <div 
                className='w-3/4 flex flex-col justify-center 
                items-center mt-4 mb-4'
            >
                <div 
                    className='w-28 h-28 flex justify-center 
                    items-center rounded-full mb-2'
                >
                    <img 
                        src={ imgSrc } 
                        alt="song-cover" 
                        className='w-auto h-auto object-cover'
                    />
                </div>

                <div 
                    className='flex justify-center items-center mb-2'
                >
                    <span
                        className='text-white text-center
                        font-semibold text-lg'
                    >
                        <a href={ url }>{ name }</a>
                    </span>
                </div>

                <div 
                    className='flex justify-center items-center mb-2'
                >
                    <span
                        className='text-white text-center
                        font-semibold text-md'
                    >
                        { artistName }
                    </span>
                </div>
            </div>
        </div>
    );
};

