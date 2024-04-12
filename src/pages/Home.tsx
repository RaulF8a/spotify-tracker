import { ChangeEvent, useEffect, useState } from 'react';
import { ArtistCard, DataCards, Navbar, SongCard } from "../components";
import { getCurrentPlayback, getProfile, getTopArtists, getTopTracks } from '../api/requests';
import { useUserStore } from '../store/userStore';

export const Home = () => {
    const { loading, setLoading, setUser, 
        user, topArtists, setTopArtists, 
        topTracks, setTopTracks, currentTrack, setCurrentTrack } = useUserStore((state) => state);

    const [ timePeriod, setTimePeriod ] = useState('medium_term');

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getProfile();
            const topArtistsData = await getTopArtists(timePeriod, 10);
            const topTracksData = await getTopTracks(timePeriod, 10);
            const currentTrackData = await getCurrentPlayback();

            setUser(userData!);
            setTopArtists(topArtistsData!);
            setTopTracks(topTracksData!);
            setCurrentTrack(currentTrackData!);
            setLoading(false);
        };

        fetchData();
    }, [timePeriod]);

    const onSelectTimePeriod = ( event: ChangeEvent<HTMLSelectElement> ) => {
        event.preventDefault();

        setTimePeriod(event.target.value);
    };

    return (
        <div>
            {
                loading 
                ? 
                    <h1>Loading...</h1> 
                : 
                <>
                    <Navbar user={ user! }/>

                    <DataCards 
                        onSelectTimePeriod={ onSelectTimePeriod }
                        currentTrack={ currentTrack! }
                    />
                    
                    <div 
                        className='w-full h-1/3 block 
                        align-middle items-center justify-center mt-20'
                    >
                        <div className='flex align-middle items-start justify-start'>
                            <h1 
                                className='text-left text-white text-2xl uppercase
                                text-bold tracking-widest ml-16'
                            >
                                Top Artists
                            </h1>

                        </div>

                        <div 
                            className='flex align-middle items-start 
                            justify-start ml-16'
                        >
                            {
                                topArtists!.items.map((artist, index) => (
                                    <ArtistCard 
                                        key={ index }
                                        artistName={ artist.name }
                                        imgSrc={ artist.images[0].url }
                                    />
                                ))
                            }
                            
                        </div>
                    </div>
                    
                    <div 
                        className='w-full h-1/3 block 
                        align-middle items-center justify-center mt-20'
                    >
                        <div className='flex align-middle items-start justify-start'>
                            <h1 
                                className='text-left text-white text-2xl uppercase
                                text-bold tracking-widest ml-16'
                            >
                                Top Songs
                            </h1>

                        </div>

                        <div 
                            className='flex align-middle items-start 
                            justify-start ml-16 mb-20'
                        >
                            {
                                topTracks!.items.map((track, index) => (
                                    <SongCard 
                                        key={ index }
                                        songName={ track.name }
                                        artistName={ track.album.artists[0].name }
                                        imgSrc={ track.album.images[0].url }
                                        url={ track.external_urls.spotify }
                                    />
                                ))
                            }
                            
                        </div>
                    </div>
                </>
            }
        </div>
    );
};
