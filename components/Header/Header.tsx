import { Link } from '../Link';

export function Header() {
  return (
    <header className='p-2 border-b border-b-gray-200'>
      <Link
        href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${process.env.SPOTIFY_APP_SCOPES}&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}`}
      >
        Log In
      </Link>
    </header>
  );
}
