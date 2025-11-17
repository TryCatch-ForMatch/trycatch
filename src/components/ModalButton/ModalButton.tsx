'use client';

import { useState } from 'react';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import type { ModalSize } from '../ui/modal';

interface GenericModalButtonProps {
  buttonLabel: string;
  title: string;
  children: React.ReactNode;
  size?: ModalSize;
}

export default function GenericModalButton({
  buttonLabel,
  title,
  children,
  size,
}: GenericModalButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className="flex h-10 items-center"
        variant="default"
        onClick={() => setOpen(true)}
      >
        {buttonLabel}
        <Plus className="ml-2" size={18} />
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        size={size}
      >
        {children}
      </Modal>
    </>
  );
}
