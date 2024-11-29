import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import { Typography } from '@/components/ui/typhography';
import { useState } from 'react';

function ToatSchema() {
  const toast = useToast();
  const [number, setNumber] = useState(1);

  return (
    <div className="flex flex-col gap-3">
      <Typography as="h3">Toast</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div>
        <Button
          onClick={() => {
            toast.open('success', `Ini Toast Success: ${number}`);
            setNumber((prev) => prev + 1);
          }}
          rounded
        >
          Toast
        </Button>
      </div>
    </div>
  );
}

export default ToatSchema;
