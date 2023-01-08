import { SpotifyError } from '@/types/spotify-error';
import { SpotifyRefreshToken } from '@/types/spotify-refresh-token';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface SuccessResponse extends SpotifyRefreshToken {}

export interface ErrorResponse extends SpotifyError {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const refreshToken = req.query['refresh_token'];
  if (!refreshToken)
    return res.status(400).json({
      error: 'invalid_refresh_token',
      error_description: 'No refresh token provided',
    });

  if (Array.isArray(refreshToken))
    return res.status(400).json({
      error: 'invalid_refresh_token',
      error_description: 'Multiple refresh tokens provided',
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
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    }),
  });
  const data: SpotifyRefreshToken | SpotifyError = await result.json();
  if ('error' in data) return res.status(500).json({ ...data });
  res.status(200).json({ ...data });
}
