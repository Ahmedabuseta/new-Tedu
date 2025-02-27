'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';
import axios from 'axios';
import { Trash } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';

// Hooks
import { useConfettiStore } from '@/hooks/use-confetti-store';

interface ActionsProps {
  disabled: boolean;
  routeId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, routeId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/routes/${routeId}/unpublish`);
        toast.success('Course unpublished');
      } else {
        await axios.patch(`/api/routes/${routeId}/publish`);
        toast.success('Course published');
        confetti.onOpen();
      }

      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/routes/${routeId}`);

      toast.success('Course deleted');
      router.refresh();
      router.push(`/teacher/routes`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Actions;
