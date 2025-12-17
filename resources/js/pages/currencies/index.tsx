// pages/currencies/index.tsx
import { PageCrudWrapper } from '@/components/PageCrudWrapper';
import { currenciesConfig } from '@/config/crud/currencies';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { toast } from '@/components/custom-toast';

export default function CurrenciesPage() {
  const { flash } = usePage().props as any;
  
  // Show flash messages if they exist
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  return (
    <PageCrudWrapper
      config={currenciesConfig}
      title="Currencies"
      url="/currencies"
    />
  );
}