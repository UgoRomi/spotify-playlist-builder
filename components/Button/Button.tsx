import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick?: () => void;
}

export function Button({ children, onClick }: Props) {
  return (
    <button
      className='rounded-md border-gray-200 py-2 px-5 border focus:ring-2 focus:ring-green-600 focus:border-green-600 hover:bg-neutral-900'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
