async function getToken(code: string | string[] | null) {
  if (!code) throw new Error('No code provided');
  console.log(code);
  return 'a';
}

export default async function Callback({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const code = searchParams?.code;
  const token = await getToken(code);
  return <main>Callback</main>;
}
