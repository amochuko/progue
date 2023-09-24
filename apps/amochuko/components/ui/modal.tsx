'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const onChange = (open: boolean) => {
    if (open) {
      props.onClose();
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
          {props.children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
