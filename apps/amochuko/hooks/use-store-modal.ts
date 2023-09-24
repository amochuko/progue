import { create } from 'zustand';
interface IUseStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModel = create<IUseStoreModal>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
