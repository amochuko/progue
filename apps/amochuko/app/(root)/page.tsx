'use client';

import { useStoreModel } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function Home() {
  const { isOpen, onOpen } = useStoreModel((s) => ({
    isOpen: s.isOpen,
    onOpen: s.onOpen,
  }));

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  const Submit = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return <div className='p-4'>hello 101</div>;
}
