import { PropsWithChildren } from 'react';
import NextLink from 'next/link';

interface Props extends PropsWithChildren {
  href: string;
}

export function Link({ children, href }: Props) {
  return (
    <NextLink href={href} className='underline hover:text-green-500'>
      {children}
    </NextLink>
  );
}
