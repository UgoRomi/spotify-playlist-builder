declare namespace NodeJS {
  export interface ProcessEnv {
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_REDIRECT_URI: string;
    SPOTIFY_APP_SCOPES: string;
  }
}
