import 'dotenv/config';
import { get } from 'env-var';

export const envsAdapter = {
    PORT: get('PORT').required().asPortNumber(),
    SPOTIFY_CLIENT_ID: get('SPOTIFY_CLIENT_ID').required().asString(),
    SPOTIFY_CLIENT_SECRET: get('SPOTIFY_CLIENT_SECRET').required().asString(),
    REMOTE_URL: get('REMOTE_URL').required().asString(),
};

