import { PageTemplate } from '@/components/page-template';
import { CrudTable } from '@/components/CrudTable';
import { CrudDeleteModal } from '@/components/CrudDeleteModal';
import { orderRequestsConfig } from '@/config/crud/order-requests';
import { useEffect, useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { toast } from '@/components/custom-toast';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { SearchAndFilterBar } from '@/components/ui/search-and-filter-bar';

export default function NfcCardOrderRequests() {
  const { t } = useTranslation();
  const { flash, orderRequests, filters: pageFilters = {}, auth } = usePage().props as any;
  const permissions = auth?.permissions || [];
  const isSuperAdmin = auth.user?.type === 'superadmin';
  
  const [searchTerm, setSearchTerm] = useState(pageFilters.search || '');
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentOrderRequest, setCurrentOrderRequest] = useState<any>(null);
  
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  useEffect(() => {
    const initialFilters: Record<string, any> = {};
    orderRequestsConfig.filters?.forEach(filter => {
      initialFilters[filter.key] = pageFilters[filter.key] || '';
    });
    setFilterValues(initialFilters);
  }, []);

  const handleAction = (action: string, item: any) => {
    if (action === 'approve') {
      toast.loading(t('Approving order request...'));
      router.post(route("nfc-cards.approve-order", item.id), {}, {
        onSuccess: () => {
          toast.dismiss();
          toast.success(t('NFC card order request approved successfully'));
        },
        onError: (errors) => {
          toast.dismiss();
          toast.error(t('Failed to approve NFC card order request'));
        }
      });
    } else if (action === 'reject') {
      toast.loading(t('Rejecting order request...'));
      router.post(route("nfc-cards.reject-order", item.id), {}, {
        onSuccess: () => {
          toast.dismiss();
          toast.success(t('NFC card order request rejected successfully'));
        },
        onError: (errors) => {
          toast.dismiss();
          toast.error(t('Failed to reject NFC card order request'));
        }
      });
    } else if (action === 'delete') {
      setCurrentOrderRequest(item);
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    toast.loading(t('Deleting order request...'));
    
    router.delete(route("nfc-cards.order-requests.destroy", currentOrderRequest.id), {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        toast.dismiss();
        // toast.success(t('NFC card order request deleted successfully'));
      },
      onError: (errors) => {
        toast.dismiss();
        toast.error(t('Failed to delete NFC card order request'));
      }
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = () => {
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params[key] = value;
      }
    });
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route("nfc-cards.order-requests"), params, { preserveState: true, preserveScroll: true });
  };

  const handleFilterChange = (key: string, value: any) => {
    // Update filter values first
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    
    const params: any = { page: 1 };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== '' && v !== 'all') {
        params[k] = v;
      }
    });
    
    if (pageFilters.per_page) {
      params.per_page = pageFilters.per_page;
    }
    
    router.get(route("nfc-cards.order-requests"), params, { preserveState: true, preserveScroll: true });
  };

  const breadcrumbs = [
    { title: t('Dashboard'), href: route('dashboard') },
    { title: t('NFC Cards'), href: route('nfc-cards.index') },
    { title: isSuperAdmin ? t('NFC Card Order Requests') : t('My Order Requests') }
  ];

  const hasActiveFilters = () => {
    return Object.entries(filterValues).some(([key, value]) => {
      return value && value !== '';
    }) || searchTerm !== '';
  };

  useEffect(() => {
    (window as any).auth = auth;
  }, [auth]);

  const filteredActions = orderRequestsConfig.table.actions?.map(action => ({
    ...action,
    label: t(action.label)
  }));

  return (
    <PageTemplate 
      title={isSuperAdmin ? t('NFC Card Order Requests') : t('My Order Requests')} 
      url="/nfc-cards/order-requests"
      breadcrumbs={breadcrumbs}
      noPadding
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow mb-4 p-4">
        <SearchAndFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSearch={handleSearch}
          filters={orderRequestsConfig.filters?.map(filter => ({
            name: filter.key,
            label: t(filter.label),
            type: 'select',
            value: filterValues[filter.key] || '',
            onChange: (value) => handleFilterChange(filter.key, value),
            options: filter.options?.map(option => ({
              value: option.value,
              label: t(option.label)
            })) || []
          })) || []}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={() => {
            return Object.values(filterValues).filter(v => v && v !== '').length + (searchTerm ? 1 : 0);
          }}
          onResetFilters={() => {
            setSearchTerm('');
            const emptyFilters = {};
            orderRequestsConfig.filters?.forEach(filter => {
              emptyFilters[filter.key] = '';
            });
            setFilterValues(emptyFilters);
            router.get(route('nfc-cards.order-requests'), { page: 1 }, { preserveState: true, preserveScroll: true });
          }}
          onApplyFilters={applyFilters}
          currentPerPage={pageFilters.per_page?.toString() || "10"}
          onPerPageChange={(value) => {
            const params: any = { page: 1, per_page: parseInt(value) };
            
            if (searchTerm) {
              params.search = searchTerm;
            }
            
            Object.entries(filterValues).forEach(([key, val]) => {
              if (val && val !== '') {
                params[key] = val;
              }
            });
            
            router.get(route('nfc-cards.order-requests'), params, { preserveState: true, preserveScroll: true });
          }}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <CrudTable
          columns={orderRequestsConfig.table.columns
            .filter(col => !col.condition || col.condition())
            .map(col => ({
              ...col,
              label: t(col.label)
            }))}
          actions={filteredActions}
          data={orderRequests?.data || []}
          from={orderRequests?.from || 1}
          onAction={handleAction}
          permissions={permissions}
          entityPermissions={orderRequestsConfig.entity.permissions}
        />

        <Pagination
          from={orderRequests?.from || 0}
          to={orderRequests?.to || 0}
          total={orderRequests?.total || 0}
          links={orderRequests?.links}
          entityName={t("NFC card order requests")}
          onPageChange={(url) => router.get(url)}
        />
      </div>

      {/* Delete Modal */}
      <CrudDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={`Order #${currentOrderRequest?.id}` || ''}
        entityName="NFC card order request"
      />
    </PageTemplate>
  );
}