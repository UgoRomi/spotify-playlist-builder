// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import querystring
import querystring from 'querystring';

type Data = {
  name: string;
};

export default function handler(res: NextApiResponse<Data>) {
  return res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: process.env.SPOTIFY_APP_SCOPES,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    })}`
  );
}
