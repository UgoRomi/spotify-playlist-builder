import { SpotifyError } from '@/types/spotify-error';
import { SpotifyGetToken } from '@/types/spotify-get-token';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface SuccessResponse extends SpotifyGetToken {}

export interface ErrorResponse extends SpotifyError {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const code = req.query.code;
  if (!code)
    return res
      .status(400)
      .json({ error: 'invalid_code', error_description: 'No code provided' });

  if (Array.isArray(code))
    return res
      .status(400)
      .json({
        error: 'invalid_code',
        error_description: 'Multiple codes provided',
      });

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });
  const data: SpotifyGetToken | SpotifyError = await result.json();
  if ('error' in data) return res.status(500).json({ ...data });
  res.status(200).json({ ...data });
}
