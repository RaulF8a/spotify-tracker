import { create } from 'zustand';
import { CurrentlyPlaying, Profile, TopArtists, TopTracks } from '../types';

interface UserState {
    user: Profile | null;
    topArtists: TopArtists | null;
    topTracks: TopTracks | null;
    currentTrack: CurrentlyPlaying | null;
    loading: boolean;

    setUser: ( user: Profile ) => void;
    setTopArtists: ( topArtists: TopArtists ) => void;
    setTopTracks: ( topTracks: TopTracks ) => void;
    setCurrentTrack: ( currentTrack: CurrentlyPlaying ) => void;
    setLoading: ( loading: boolean ) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    topArtists: null,
    topTracks: null,
    currentTrack: null,
    loading: true,
    
    setUser: ( user: Profile ) => set({ user }),
    setTopArtists: ( topArtists: TopArtists ) => set({ topArtists }),
    setTopTracks: ( topTracks: TopTracks ) => set({ topTracks }),
    setCurrentTrack: ( currentTrack: CurrentlyPlaying ) => set({ currentTrack }),
    setLoading: ( loading: boolean ) => set({ loading }),
}));

