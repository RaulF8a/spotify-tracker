import { redirectToSpotifyAuth } from "../api/requests";

export const Login = () => {
    const onSpotifyLogin = async () => {
        await redirectToSpotifyAuth();
    };

    return (
        <div 
            className='w-full h-screen flex items-center justify-center'
        >
            <div className=''>
                <h1 
                    className='uppercase tracking-widest font-bold
                    text-white text-2xl text-center'
                >
                    Bienvenido a Spotify Tracker
                </h1>

                <button 
                    className='bg-green-500 
                    text-white px-4 py-2 mt-4 rounded items-center'
                    onClick={ onSpotifyLogin }
                >
                    Iniciar sesión con Spotify
                </button>
            </div>
        </div>
    );
};

