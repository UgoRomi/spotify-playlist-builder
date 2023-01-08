'use client';
import { useRouter } from 'next/navigation';
import { ErrorResponse, SuccessResponse } from 'pages/api/get-token';
import { PropsWithChildren } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Container({ children }: PropsWithChildren) {
  return (
    <main className='w-full h-full flex justify-center items-center text-3xl font-bold'>
      {children}
    </main>
  );
}

export default function Callback({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const code = searchParams?.code;
  const router = useRouter();
  if (!code) throw new Error('No code provided');
  if (Array.isArray(code)) throw new Error('Multiple codes provided');

  const { data, error, isLoading } = useSWR<SuccessResponse | ErrorResponse>(
    `/api/get-token?code=${code}`,
    fetcher
  );

  if (isLoading) return <Container>Loading...</Container>;
  if (error) throw error;
  if (!data) throw new Error('No data');
  if ('error' in data) throw new Error(data.error_description);
  // Set the refresh token and the access token as cookies
  document.cookie = `refresh_token=${data.refresh_token}; path=/`;
  document.cookie = `access_token=${data.access_token}; path=/; max-age=${data.expires_in};`;
  // Redirect to the home page
  router.push('/');
  return <Container>Redirecting you...</Container>;
}
