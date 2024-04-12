import { Profile } from "../types";

interface NavbarProps {
    user: Profile;
}

export const Navbar = ({ user }: NavbarProps) => {
    return (
        <nav
            className='bg-black h-14 w-full flex items-center justify-center'
        >
            <div className='w-11/12 flex items-center justify-between'>
                <h1
                    className='text-white font-bold text-2xl'
                >
                    Spotify Tracker
                </h1>

                <div className='flex items-center'>
                    <a
                        href=''
                        className='mr-5'
                    >
                        <img
                            src={ user.profile.images[0].url }
                            alt='Avatar'
                            className='w-8 h-8 rounded-full'
                        />
                    </a>

                    <span
                        className='text-white'
                    >
                        { user.profile.display_name}
                    </span>
                    
                    <button
                        className='text-white pl-5'
                    >
                        -
                    </button>
                </div>
            </div>
        </nav>
    );
};

