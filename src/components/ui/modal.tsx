'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

import { Button } from './button';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => !isOpen && onClose()}
    >
      <DialogContent className="w-auto max-w-3xl overflow-hidden rounded-2xl p-6 shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="mt-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
