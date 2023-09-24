'use client';

import { StoreModal } from '@/components/modals/store-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // to avoid hydration error on server side
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
