'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  xl: 'max-w-6xl',
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'xl',
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => !isOpen && onClose()}
    >
      <DialogContent
        className={`w-full ${sizeClasses[size]} overflow-hidden rounded-2xl p-6 shadow-lg`}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="mt-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
